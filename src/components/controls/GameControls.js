import GameInfo from "./GameInfo";
import {TbClick} from "react-icons/tb";
import {IoMdTime} from "react-icons/io";
import ControlButton from "./ControlButton";

const GameControls = ({}) => {
    return (
        <div
            className="flex flex-col justify-between gap-2"
        >
            <div
                className="flex flex-row sm:flex-col gap-4 justify-between"
            >
                <GameInfo label="Moves" icon={<TbClick />}>0</GameInfo>
                <GameInfo label="time" icon={<IoMdTime />}>00:00</GameInfo>
            </div>
            <div
                className="flex flex-row sm:flex-col gap-2"
            >
                <ControlButton>Start</ControlButton>
                <ControlButton>Change Difficulty</ControlButton>
            </div>
        </div>
    );
}

export default GameControls;