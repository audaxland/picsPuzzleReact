import puzzleImage from '../../assets/images/tiger.jpg';
import {useContext} from "react";
import {GameContext} from "../../store/GameContext";

const BoardCell = ({x, y, imgX, imgY, canPlay = false}) => {
    const {play} = useContext(GameContext);

    return (
        <div
            style={{
                top: y * 100,
                left: x * 100,
            }}
            className={"absolute w-[100px] h-[100px] overflow-hidden transition duration-300 ease-in-out " +
                " border border-[#fff3] " +
            (canPlay ? " cursor-pointer hover:opacity-80 hover:border-indigo-700" : "")}
            onClick={canPlay ? (() => play(x,y)) : undefined}
        >
            <div
                style={{
                    backgroundImage: `url('${puzzleImage}')`,
                    top: -1 * imgY * 100,
                    left: -1 * imgX * 100,

                }}
                className="h-[500px] w-[400px] bg-cover bg-center absolute"
            />
        </div>
    );
}

export default BoardCell;