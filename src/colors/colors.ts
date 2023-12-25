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
    ["monochromatic", generateMonochromaticColors(color)]
  ];
}

function generateComplementaryColors(color: Color): Palette {
  const [h, s, l] = chroma(color).hsl();
  const complementaryColor = chroma((h + 180) % 360, s, l, "hsl").hex();
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
