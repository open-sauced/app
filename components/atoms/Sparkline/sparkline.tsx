import React from "react";
import sparkline from "../../../lib/utils/sparkline.js";

interface SparklineProps {
  canvasID?: string;
  canvasWidth?: number;
  canvasHeight?: number;
}

const Sparkline: React.FC<SparklineProps> = ({ canvasID, canvasWidth, canvasHeight }) => {
  return (
    <div>
      <canvas id={canvasID} width={canvasWidth} height={canvasHeight}></canvas>

      <script type="javascript">
        sparkline('mycanvas', [145, 123, 121, 78, 23, 9, 23, 24, 25, 89, 35, 124, 78, 98], true);
      </script>
    </div>
  );
};

export default Sparkline;
