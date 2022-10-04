import BoardCell from "./BoardCell";
import {useContext} from "react";
import {GameContext} from "../../store/GameContext";


const GameBoard = () => {
    const {board} = useContext(GameContext);
    return (
        <div
            className="relative bg-[#ccc5] w-[400px] h-[500px]"
        >
            {(!!board) && board.map(cell => (
                <BoardCell key={cell.id} {...cell} />
            ))}
        </div>
    );
}

export default GameBoard;