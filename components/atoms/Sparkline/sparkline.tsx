import { SparklineLib } from "lib/utils/SparklineLib";
import React from "react";

interface SparklineProps {
  canvasId?: string;
  canvasWidth?: number;
  canvasHeight?: number;
}

const Sparkline: React.FC<SparklineProps> = ({ canvasId, canvasWidth, canvasHeight }) => {
  return (
    <div>
      <canvas id={canvasId} width={canvasWidth} height={canvasHeight}></canvas>

      <script type="javascript">
        sparkline('mycanvas', [145, 123, 121, 78, 23, 9, 23, 24, 25, 89, 35, 124, 78, 98], true);
      </script>
    </div>
  );
};

export default Sparkline;
