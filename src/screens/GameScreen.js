import GameBoard from "../components/board/GameBoard";
import GameControls from "../components/controls/GameControls";

/**
 * Game Screen component, renders the puzzle in GameBoard and the game information and buttons in GameControls
 * @returns {JSX.Element}
 * @constructor
 */
const GameScreen = () => {
    return (
        <>
            <GameBoard />
            <GameControls />
        </>
    );
}

export default GameScreen;