import GameBoard from "../components/board/GameBoard";
import GameControls from "../components/controls/GameControls";

const GameScreen = ({}) => {
    return (
        <div
            className="flex flex-col sm:flex-row gap-4 p-4 bg-[#daf4] rounded-lg"
        >
            <GameBoard />
            <GameControls />
        </div>
    );
}

export default GameScreen;