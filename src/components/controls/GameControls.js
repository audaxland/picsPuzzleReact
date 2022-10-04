import GameInfo from "./GameInfo";
import {TbClick} from "react-icons/tb";
import {IoMdTime} from "react-icons/io";
import ControlButton from "./ControlButton";
import {useContext, useEffect, useState} from "react";
import {GameContext} from "../../store/GameContext";

const GameControls = () => {
    const {game, start} = useContext(GameContext);
    const [clock, setClock] = useState('00:00');

    useEffect(() => {
        const getClock = () => {
            if ((!game) || (!game.startTime)) {
                return setClock('00:00');
            }
            const elapsed = game.getElapsedTime();
            setClock(
                Math.floor(elapsed/60).toString().padStart(2, '0')
                + ':' +
                (elapsed % 60).toString().padStart(2, '0')
            );
            return setTimeout(getClock, 1000);
        };
        let timer = getClock();
        return () => {timer && clearTimeout(timer)};
    }, [game, game?.startTime]);
    return (
        <div
            className="flex flex-col justify-between gap-2"
        >
            <div
                className="flex flex-row sm:flex-col gap-4 justify-between"
            >
                <GameInfo label="Moves" icon={<TbClick />}>{game?.moves?.length ?? 0}</GameInfo>
                <GameInfo label="time" icon={<IoMdTime />}>{clock}</GameInfo>
            </div>
            <div
                className="flex flex-row sm:flex-col gap-2"
            >
                <ControlButton onClick={start}>Start</ControlButton>
                <ControlButton>Change Difficulty</ControlButton>
            </div>
        </div>
    );
}

export default GameControls;