import GameScreen from "./screens/GameScreen";
import {Navigate, Route, Routes} from "react-router-dom";
import SelectSize from "./screens/SelectSize";
import FoundationLayout from "./components/layout/FoundationLayout";

/**
 * Puzzle Game wrapper
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  return (
    <FoundationLayout>
        <Routes>
            <Route path="/" element={<GameScreen />}/>
            <Route path="/select-size" element={<SelectSize />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>

    </FoundationLayout>
  );
}

export default App;
