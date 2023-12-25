import { useState } from 'react';
import './App.css';
import { ColorPlayground } from './ColorPlayground/ColorPlayground';
import { Diego } from './diego/diego';
import { Color } from './colors/colors';

function App() {
  const [color, setColor] = useState<Color>("#3fd4c1");
  return (
    <div className="App">
      <ColorPlayground color={color} setColor={setColor}/>
      <Diego backgroundColor={color} />
    </div>
  );
}

export default App;
