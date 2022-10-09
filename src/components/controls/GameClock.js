import {useContext, useEffect, useState} from "react";
import {GameContext} from "../../store/GameContext";
import {IoMdTime} from "react-icons/io";
import GameInfo from "./GameInfo";

/**
 * Renders a clock showing the time elapsed
 * @returns {JSX.Element}
 * @constructor
 */
const GameClock = () => {
    /**
     * @type {import('../../store/GameContext').GameContextType}
     */
    const {game} = useContext(GameContext);

    /**
     * clock is the time elapsed in minutes:seconds
     */
    const [clock, setClock] = useState(/** @type {string} */ '00:00');

    useEffect(() => {
        /**
         * read the elapsed time from the game object and update the clock state value
         * @returns {null}
         */
        const updateClock = () => {
            if ((!game) || (!game.startTime)) {
                setClock('00:00');
                return null;
            }
            const elapsed = game.getElapsedTime();
            // convert from seconds to "mm:ss" string
            setClock(
                Math.floor(elapsed/60).toString().padStart(2, '0')
                + ':' +
                (elapsed % 60).toString().padStart(2, '0')
            );
        }
        // if the game is not being played, only update the clock once
        if ((!game) || (!game?.startTime) || game.pauseTime || game.gameWon) {
            updateClock();
            return;
        }

        // while the game is played, update the clock each second
        let interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [game, game?.startTime, game?.pauseTime, game?.gameWon]);

    return (
        <GameInfo label="time" icon={<IoMdTime />}>{clock}</GameInfo>
    );
}

export default GameClock;