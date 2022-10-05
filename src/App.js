import GameScreen from "./screens/GameScreen";
import {Navigate, Route, Routes} from "react-router-dom";
import SelectSize from "./screens/SelectSize";
import FoundationLayout from "./components/layout/FoundationLayout";

function App() {
  return (
    <FoundationLayout>
        <Routes>
            <Route path="/game" element={<GameScreen />}/>
            <Route path="/select-size" element={<SelectSize />} />
            <Route path="*" element={<Navigate to="/game" />} />
        </Routes>

    </FoundationLayout>
  );
}

export default App;
