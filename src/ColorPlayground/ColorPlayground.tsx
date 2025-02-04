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
  const [textColor, setTextColor] = useState<Color>("#000000");
  // const RGB = ["#FF0000", "#00FF00", "#0000FF"];
  // const PRIMARY = ["#FF0000", "#0000FF", "#FFFF00"];
  // const colorMixes = [chroma(inputValue).cmyk(), chroma(PRIMARY[1]).cmyk()];
  // const a = [0,0,0,0]
  // a[0] = (colorMixes[0][0] + colorMixes[1][0]) / 2
  // a[1] = (colorMixes[0][1] + colorMixes[1][1]) / 2
  // a[2] = (colorMixes[0][2] + colorMixes[1][2]) / 2
  // a[3] = (colorMixes[0][3] + colorMixes[1][3]) / 2
  // console.log(a)
  
  // const experimentalColor = chroma(
  //   a[0], a[1], a[2], a[3],
  //   "cmyk"
  // ).hex();

  useEffect(() => {
    setColors(generatePalettesFromColor(inputColor));
    setTextColor(chroma.contrast(inputColor, "#fff") >
    chroma.contrast(inputColor, "#000000")
      ? "#ffffff"
      : "#000000");
  }, [inputColor]);

        

  return (
    <div className="color-playground">
      <div className="palette-container">
        <div className="palette-title">PRIMARY</div>
        <div className="palette-colors-container">
          <div
            className="palette-color"
            style={{ backgroundColor: inputColor, color: textColor }}
          >
            {inputColor}
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
            if (chroma.valid(e.currentTarget.value)) {
              setInputColor(e.currentTarget.value);
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
