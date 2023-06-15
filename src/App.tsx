import { useEffect } from "react";
import { radar_visualization } from "./radar";
import { radarConfig } from "./contants";

function App() {
  useEffect(() => {
    radar_visualization(radarConfig);
  }, []);

  return (
    <div>
      <svg id="radar"></svg>
    </div>
  );
}

export default App;
