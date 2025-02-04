import { useState } from 'react';
import './App.css';
import { ColorPlayground } from './ColorPlayground/ColorPlayground';
import { Color } from './colors/colors';

function App() {
  const [color, setColor] = useState<Color>('#11786f'); //"#3fd4c1");
  return (
    <div className="App">
      <ColorPlayground color={color} setColor={setColor}/>
    </div>
  );
}

export default App;
