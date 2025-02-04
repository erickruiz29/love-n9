import chroma from "chroma-js";

export type Palette = string[];
export type Color = string;
export type NamedPalette = [string, Palette];
// Given a color, suggest to me some colors that will 'go with' this color
// Can be, for example, complementary, triadic, tone, shade, etc

export function generatePalettesFromColor(color: Color): NamedPalette[] {
  return [
    ["complementary", generateComplementaryColors(color)],
    ["triadic", generateTriadicColors(color)],
    ["analogous", generateAnalogousColors(color)],
    ["tetradic", generateTetradicColors(color)],
    ["monochromatic", generateMonochromaticColors(color)],
    ["gradient", getGradientColor(color, generateComplementaryColors(color)[1], 5)]
  ];
}

function generateComplementaryColors(color: Color): Palette {
  const [h, s, l] = chroma(color).hsl();
  const complementaryColor = chroma((h + 180) % 360, s, l > 0.5 ? l - 0.2 : l + 0.2, "hsl").hex();
  return [color, complementaryColor];
}

function generateTriadicColors(color: Color): Palette {
  const [h, s, l] = chroma(color).hsl();
  const additives = [0, -120, 120];
  const triadics = additives.map((add) => {
    return chroma((h + add) % 360, s, l, "hsl").hex();
  });
  return triadics;
}

function generateAnalogousColors(color: Color): Palette {
  const [h, s, l] = chroma(color).hsl();
  const additives = [0, -60, 60];
  const analogous = additives.map((add) => {
    return chroma((h + add) % 360, s, l, "hsl").hex();
  });
  return analogous;
}

function generateTetradicColors(color: Color): Palette {
  const [h, s, l] = chroma(color).hsl();
  const additives = [0, 90, 180, 270];
  const tetradic = additives.map((add) => {
    return chroma((h + add) % 360, s, l, "hsl").hex();
  });
  return tetradic;
}

function generateMonochromaticColors(color: Color): Palette {
  const [h, s, l] = chroma(color).hsl();
  const additives = [-.25, -.125, 0, .125, .25];
  const monochrome = additives.map((add) => {
    return chroma(h, s, +((l + add) % 1).toFixed(3), "hsl").hex();
  });
  return monochrome;
}

// Existing function to generate random colors
export function getRandomColor() {
    const colors = [
        '#E05351', // Coral
        '#CA92E1', // Purple
        '#68E04E', // Green
        '#E69294', // Pink
        '#9294E6', // Light Blue
        '#925150', // Mauve
        '#E231FF', // Orchid
        '#3ABBA1', // Teal
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Updated function to generate a gradient color with more visually appealing colors
export function getGradientColor(startColor: string , endColor: string, steps: number) {
    const start = parseInt(startColor.slice(1), 16);
    const end = parseInt(endColor.slice(1), 16);
    const r1 = (start >> 16) & 0xff;
    const g1 = (start >> 8) & 0xff;
    const b1 = start & 0xff;
    const r2 = (end >> 16) & 0xff;
    const g2 = (end >> 8) & 0xff;
    const b2 = end & 0xff;
    const stepR = (r2 - r1) / steps;
    const stepG = (g2 - g1) / steps;
    const stepB = (b2 - b1) / steps;
    const gradientColors = [];
    for (let i = 0; i <= steps; i++) {
        const r = Math.round(r1 + stepR * i);
        const g = Math.round(g1 + stepG * i);
        const b = Math.round(b1 + stepB * i);
        gradientColors.push(`#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`);
    }
    return gradientColors;
}