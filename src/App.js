import Canvas from "./Components/Canvas.component";
import "./App.css";

// backgroundColor --> Accept backgroundColor (type --> r, g, b)
// textColor --> Accept color for trailing text (type --> color(Hex, HSLA, rgba))
// fontSize --> Accept the size of the font (type --> number)
// textString --> Accept string displayed as trail (type --> string)

function App() {
  return (
    <div className="App">
      <Canvas />
    </div>
  );
}

export default App;
