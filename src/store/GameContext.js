import {createContext, useCallback, useEffect, useState} from "react";
import Game from "../models/Game";

export const GameContext = createContext({});

export const GameContextProvider = ({children}) => {
    const [size, setSize] = useState({x: 4, y: 5});

    /**
     * @type {[Game, function]}
     */
    const [game, setGame] = useState(null);
    const [board, setBoard] = useState(null);


    useEffect(() => {
        setGame(new Game({size}));

    }, [size]);

    useEffect(() => {
        if (!game) return;
        setBoard(game.getBoard());
    }, [game])

    const start = useCallback(() => {
        if (!game) return;
        game.start();
        setBoard(game.getBoard());
    }, [game]);

    const play = useCallback((x, y) => {
        if (!game) return;
        game.play(x, y);
        setBoard(game.getBoard());
    }, [game]);


    return (
        <GameContext.Provider value={{
            game,
            board,
            start,
            play,
        }}>
            {children}
        </GameContext.Provider>
    )
}
