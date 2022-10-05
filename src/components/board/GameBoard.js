import BoardCell from "./BoardCell";
import {useContext, useEffect, useState} from "react";
import {GameContext} from "../../store/GameContext";
import {useWindowSize} from "@react-hook/window-size";


const GameBoard = () => {
    const {board} = useContext(GameContext);
    const {size} = useContext(GameContext);
    const [windowWidth, windowHeight] = useWindowSize();
    const [cellSize, setCellSize] = useState(null);

    useEffect(() => {
        if (!size) return;
        const isXsScreen = windowWidth < 639;
        const isSmScreen = windowWidth < 768;
        const maxBoardX = windowWidth - (isXsScreen ? 50 : (isSmScreen ? 100 : 220));
        const maxBoardY = windowHeight - (isSmScreen ? 160 : 60);
        const maxCellX = Math.floor(maxBoardX / (size?.x || 1));
        const maxCellY = Math.floor(maxBoardY / (size?.y || 1));
        console.log(windowWidth, maxBoardX, maxBoardY, maxCellX, maxCellY)
        setCellSize(Math.min(maxCellX, maxCellY));
    }, [size, windowWidth, windowHeight])

    if ((!size) || (!board)) return null;

    return (
        <div
            className="flex items-center justify-center p-1 bg-[#ccc5] rounded"
        >
            <div
                className="relative bg-[#ddd6]"
                style={{
                    width: size.x * cellSize,
                    height: size.y * cellSize,
                }}
            >
                {(!!board) && board.map(cell => (
                    <BoardCell key={cell.id} {...cell} cellSize={cellSize}/>
                ))}
            </div>
        </div>

    );
}

export default GameBoard;