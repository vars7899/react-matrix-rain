import Canvas from "./Components/Canvas.component";
import "./App.css";

// backgroundColor --> Accept backgroundColor (type --> r, g, b)
// textColor --> Accept color for trailing text (type --> color(Hex, HSLA, rgba))
// fontSize --> Accept the size of the font (type --> number)

function App() {
  return (
    <div className="App">
      <Canvas height={200} width={200} />
    </div>
  );
}

export default App;
