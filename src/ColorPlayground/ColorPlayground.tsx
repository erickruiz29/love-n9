import { useEffect, useState } from "react";
import "./styles.css";
import {
  Color,
  NamedPalette,
  generatePalettesFromColor,
} from "../colors/colors";
import chroma from "chroma-js";

interface ColorPlaygroundProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

export function ColorPlayground({ color, setColor }: ColorPlaygroundProps) {
  const [colors, setColors] = useState<NamedPalette[]>([]);
  const [inputColor, setInputColor] = useState<Color>(color);
  const [inputValue, setInputValue] = useState<string>(color);
  const RGB = ["#FF0000", "#00FF00", "#0000FF"];
  const PRIMARY = ["#FF0000", "#0000FF", "#FFFF00"];
  const [h1, s1, l1] = chroma(PRIMARY[0]).hsl();
  const [h2, s2, l2] = chroma(PRIMARY[1]).hsl();

  const experimentalColor = chroma(
    Math.abs((h1 - h2) / 2) % 360,
    s1,
    l1,
    "hsv"
  ).hex();

  useEffect(() => {
    setColors(generatePalettesFromColor(inputColor));
  }, [inputColor]);

  return (
    <div className="color-playground">
      <div className="palette-container">
        <div className="palette-title">SECONDARY</div>
        <div className="palette-colors-container">
          <div
            className="palette-color"
            style={{ backgroundColor: experimentalColor }}
          >
            {experimentalColor}
          </div>
        </div>
      </div>
      <div className="color-input-container">
        <div className="color-input-label">Color: </div>
        <input
          className="color-input"
          name="color"
          type="text"
          onInput={(e) => {
            if (chroma.valid(inputValue)) {
              setInputColor(inputValue);
            }
          }}
        />
      </div>
      {colors.map((palette) => {
        return (
          <div className={"palette-container"} key={palette[0]}>
            <div className="palette-title">{palette[0]}</div>
            <div className="palette-colors-container">
              {palette[1].map((color) => {
                const textColor =
                  chroma.contrast(color, "#fff") >
                  chroma.contrast(color, "#000000")
                    ? "#ffffff"
                    : "#000000";
                return (
                  <div
                    key={`${palette[0]}_${color}`}
                    className="palette-color"
                    style={{ backgroundColor: color, color: textColor }}
                    onMouseEnter={(e) => {
                      setColor(color);
                    }}
                    onClick={() => {
                      setInputValue(color);
                      setInputColor(color);
                    }}
                  >
                    {color}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
