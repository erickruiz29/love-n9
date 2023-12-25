import chroma from 'chroma-js';
import './style.css'

export interface DiegoProps {
  backgroundColor: string;
}

export function Diego({backgroundColor = "#000"}: DiegoProps) {
  const color = chroma.contrast(backgroundColor, "#fff") > chroma.contrast(backgroundColor, "#000000") ? "#ffffff" : "#000000"
  return (<div className="diego-container" style={{backgroundColor, color}}>
    Diego is a cool brother. Right on...
  </div>)
}