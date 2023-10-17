export function stringToHSLAColor({
  id,
  saturation = 90,
  lightness = 48,
  alpha = 1,
}: {
  id: string;
  saturation?: number;
  lightness?: number;
  alpha?: number;
}) {
  // Ensure valid values for saturation and lightness (0-100) and alpha (0-1)
  saturation = Math.min(Math.max(saturation, 0), 100);
  lightness = Math.min(Math.max(lightness, 0), 100);
  alpha = Math.min(Math.max(alpha, 0), 1);

  // Use a simple hashing algorithm to generate H, S, and L values
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = ((hash % 360) + 360) % 360; // Ensure H value is between 0 and 360

  return `hsla(${h}, ${saturation}%, ${lightness}%, ${alpha})`;
}

export const getGraphColorPalette = () => {
  const colors = [
    "#fb923c",
    "#34d399",
    "#10b981",
    "#22d3ee",
    "#818cf8",
    "#3b82f6",
    "#e879f9",
    "#fb7185",
    "#38bdf8",
    "#a78bfa",
    "#c084fc",
    "#f472b6",
  ];

  return colors;
};
