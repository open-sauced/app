import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import { ResponsiveScatterPlot, ScatterPlotNodeProps } from "@nivo/scatterplot";
import { animated } from "@react-spring/web";

import humanizeNumber from "lib/utils/humanizeNumber";

import ToggleOption from "components/atoms/ToggleOption/toggle-option";
import Title from "components/atoms/Typography/title";
import ToggleGroup from "components/atoms/ToggleGroup/toggle-group";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import CustomTooltTip from "./CustomTooltip";

export type PrStatusFilter = "open" | "closed" | "all";

export interface ScatterChartDataItems {
  x: string | number;
  y: string | number;
  image: string;
  contributor: string;
}

export interface ScatterChartMetadata {
  allPrs: number;
  openPrs: number;
  closedPrs: number;
}

interface ScatterPlotProps {
  maxFilesModified: number;
  title?: string;
  showBots: boolean;
  setShowBots: (toggle: boolean) => void;
  data: {
    id: string;
    data: ScatterChartDataItems[];
  }[];
  isMobile?: boolean;
  repositories?: number[];
  metadata?: ScatterChartMetadata;
  handleSetPrFilter?: (state: PrStatusFilter) => void;
}

const NivoScatterPlot = ({
  data,
  maxFilesModified,
  title,
  setShowBots,
  showBots,
  isMobile,
  repositories,
  metadata,
  handleSetPrFilter,
}: ScatterPlotProps) => {
  const [showMembers, setShowMembers] = useState(false);
  const [isLogarithmic, setIsLogarithmic] = useState(true);
  const { userId } = useSupabaseAuth();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [contributorName, setContributorName] = useState("");
  let functionTimeout: any;

  // Brought this in here to have access to repositories
  const router = useRouter();
  const topic = router.query.pageId as string;
  const CustomNode = (props: ScatterPlotNodeProps<ScatterChartDataItems>) => {
    const { node, onMouseEnter, onMouseMove, onMouseLeave, onClick } = props;

    const handleMouseEnter = useCallback(
      (event: any) => {
        setTooltipVisible(true);
        setMouseX(event.clientX);
        setMouseY(event.clientY);
        setContributorName(node.data.contributor);
        onMouseEnter?.(node, event);
      },
      [node, onMouseEnter]
    );

    const handleMouseMove = useCallback(
      (event: any) => {
        onMouseMove?.(node, event);
      },
      [node, onMouseMove]
    );

    const handleMouseLeave = useCallback(
      (event: any) => {
        setTimeout(() => {
          setTooltipVisible(false);
        }, 500);

        onMouseLeave?.(node, event);
      },
      [node, onMouseLeave]
    );

    const handleClick = useCallback(
      (event: any) => {
        onClick?.(node, event);
      },
      [node, onClick]
    );

    return (
      <animated.foreignObject
        className="cursor-pointer"
        width={35}
        height={35}
        r={props.style.size.to((size: number) => size / 2) as unknown as number}
        y={props.style.y.to((yVal: number) => yVal - 35 / 1) as unknown as number}
        x={props.style.x.to((xVal: number) => xVal - 35 / 2) as unknown as number}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => {
          setTooltipVisible(false);
        }}
        onClick={handleClick}
      >
        <Avatar contributor={props.node.data.contributor} />
      </animated.foreignObject>
    );
  };

  const handleTogglePrFilter = (val: string) => {
    switch (val) {
      case "0":
        handleSetPrFilter?.("all");
        break;

      case "1":
        handleSetPrFilter?.("open");
        break;

      case "2":
        handleSetPrFilter?.("closed");
        break;
    }
  };

  const handleShowMembers = () => {
    clearTimeout(functionTimeout);

    functionTimeout = setTimeout(() => {
      setShowMembers(!showMembers);
      // Additional logic for showing members
    }, 50);
  };

  const handleSetLogarithmic = () => {
    clearInterval(functionTimeout);

    functionTimeout = setTimeout(() => {
      setIsLogarithmic(!isLogarithmic);
    });
  };

  const handleShowBots = () => {
    clearTimeout(functionTimeout);

    functionTimeout = setTimeout(() => {
      setShowBots(!showBots);
      // Additional logic for showing bots
    }, 50);
  };

  const filteredData = [{ id: data[0].id, data: data[0].data.filter((data) => Number(data.x) <= 7) }];

  return (
    <>
      {(tooltipVisible || isHovered) && (
        <div
          style={{
            position: "absolute",
            marginTop: mouseY - 400,
            marginLeft: mouseX - 100,
            zIndex: 9999,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CustomTooltTip username={contributorName} repositories={repositories} id={userId} />
        </div>
      )}
      <div
        className="flex flex-col items-center justify-between px-0 pt-3 md:flex-row md:px-7"
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <Title level={4} className="!text-sm  !text-light-slate-12">
          {title}
        </Title>
        {metadata ? (
          <ToggleGroup handleChange={handleTogglePrFilter} className="hidden lg:flex" label="Pull Request State">
            <>
              All PRs
              <span className="ml-2 py-0.5 px-1.5 h-fit bg-slate-200 text-slate-500 border rounded-full text-xs font-semibold">
                {humanizeNumber(metadata.allPrs, null)}
              </span>
            </>
            <>
              Open
              <span className="ml-2 py-0.5 px-1.5 h-fit bg-slate-200 text-slate-500 border rounded-full text-xs font-semibold">
                {humanizeNumber(metadata.openPrs, null)}
              </span>
            </>
            <>
              Closed
              <span className="ml-2 py-0.5 px-1.5 h-fit bg-slate-200 text-slate-500 border rounded-full text-xs font-semibold">
                {humanizeNumber(metadata.closedPrs, null)}
              </span>
            </>
          </ToggleGroup>
        ) : (
          <></>
        )}
        {/* replaced display flex to hidden on show/bots container */}
        <div className="flex gap-2 mt-3 md:mt-0" onMouseLeave={() => setTooltipVisible(false)}>
          <div>
            <ToggleOption handleToggle={handleShowBots} checked={showBots} optionText="Show Bots"></ToggleOption>
          </div>
          <div>
            <ToggleOption
              handleToggle={handleSetLogarithmic}
              optionText="Enhance"
              checked={isLogarithmic}
            ></ToggleOption>
          </div>
        </div>
      </div>
      <div className="h-[400px]" onMouseLeave={() => setTooltipVisible(false)}>
        <ResponsiveScatterPlot
          nodeSize={isMobile ? 25 : 35}
          data={isMobile ? filteredData : data}
          margin={{ top: 30, right: isMobile ? 30 : 60, bottom: 70, left: isMobile ? 75 : 90 }}
          xScale={{ type: "linear", min: 0, max: isMobile ? 7 : 32, reverse: true }}
          yScale={{
            type: isLogarithmic ? "symlog" : "linear",
            min: 0,
            max: Math.max(Math.round(maxFilesModified * 1.5), 10),
          }}
          blendMode="normal"
          useMesh={false}
          annotations={[]}
          nodeComponent={CustomNode}
          axisBottom={{
            tickSize: 8,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: isMobile ? 4 : 7,
            format: (value) => (value === 0 ? "Today" : value > 32 ? "30+ days ago" : `${value} days ago`),
          }}
          theme={{
            axis: {},
            grid: {
              line: {
                strokeDasharray: "4 4",
                strokeWidth: 1,
                strokeOpacity: 0.7,
              },
            },
          }}
          tooltip={({ node }) => {
            return null;
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setTooltipVisible(false);
            }, 500);
          }}
          isInteractive={true}
          axisLeft={{
            tickSize: 2,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: 5,
            legend: "Lines Touched",
            legendPosition: "middle",
            legendOffset: -60,
            format: (value: number) => {
              return parseInt(`${value}`) >= 1000 ? humanizeNumber(value, "abbreviation") : `${value}`;
            },
          }}
        />
      </div>
    </>
  );
};

export default NivoScatterPlot;
