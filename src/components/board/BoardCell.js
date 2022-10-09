import {useContext} from "react";
import {GameContext} from "../../store/GameContext";

/**
 * Individual square puzzle piece
 * @param {number} x - x current position of the piece ( number of the column range 0..size.x-1)
 * @param {number} y - y current position of the piece (number of row range 0..size.y-1)
 * @param {number} imgX - x position of the piece once puzzle solved (range 0..size.x-1)
 * @param {number} imgY - y position og the piece once puzzle solved (range 0..size.y-1
 * @param {boolean} canPlay - true if the piece can be moved
 * @param {number} cellSize - size in pixed of the piece square
 * @returns {JSX.Element|null}
 * @constructor
 */
const BoardCell = ({
    x,
    y,
    imgX,
    imgY,
    canPlay = false,
    cellSize
}) => {
    /**
     * @type {import('../../store/GameContext').GameContextType}
     */
    const {play, size, puzzleImage} = useContext(GameContext);

    // the puzzle image is not defined upon first render
    if (!puzzleImage) return null;

    return (
        <div
            style={{
                top: y * cellSize,
                left: x * cellSize,
                height: cellSize,
                width: cellSize,
            }}
            className={"z-10 absolute overflow-hidden transition-all duration-300 ease-in-out " +
                " border border-[#fff3] " +
                (canPlay ? " cursor-pointer hover:opacity-80 hover:border-indigo-700" : "")}
            onClick={canPlay ? (() => play(x,y)) : undefined}
        >
            <div
                style={{
                    backgroundImage: `url('${puzzleImage}')`,
                    top: -1 * imgY * cellSize,
                    left: -1 * imgX * cellSize,
                    height: size.y * cellSize,
                    width: size.x * cellSize,

                }}
                className="h-[500px] w-[400px] bg-cover bg-center absolute"
            />
        </div>
    );
}

export default BoardCell;