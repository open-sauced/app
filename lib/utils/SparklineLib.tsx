export function sparkline(canvasID: string, data: number[], styleCode: string, colorCode: string, endpoint?: boolean) {
  if (window.HTMLCanvasElement) {
    const canvas = document.getElementById(canvasID) as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D,
      color = (colorCode ? colorCode : "rgba(0,0,0,0.5)"),
      style = (styleCode == "bar" ? "bar" : "line"),
      height = canvas.height - 3,
      width = canvas.width,
      total = data.length,
      max = Math.max.apply(Math, data),
      xstep = width/total,
      ystep = max/height,
      x = 0,
      y = height - data[0]/ystep ?? 0,
      i;

    if (window.devicePixelRatio) {
      canvas.width = canvas.width * window.devicePixelRatio;
      canvas.height = canvas.height * window.devicePixelRatio;
      canvas.style.width = (canvas.width / window.devicePixelRatio) + "px";
      canvas.style.height = (canvas.height / window.devicePixelRatio) + "px";
      canvas.style.display = "inline-block";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x, y);
    for (i = 1; i < total; i = i + 1) {
      x = x + xstep;
      y = height - data[i]/ystep + 2;
      if (style == "bar") { ctx.moveTo(x,height); }
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    if (endpoint && style == "line") {
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,0,0,0.5)";
      ctx.arc(x, y, 1.5, 0, Math.PI*2);
      ctx.fill();
    }
  }
}