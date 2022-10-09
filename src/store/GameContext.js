import {createContext, useCallback, useEffect, useState} from "react";
import Game from "../models/Game";
import {pickRandomImage} from "../data/imageList";

/**
 * @typedef {Object} GameContextType
 * @property {{x: number, y: number}} size - number of columns and rows of the puzzle
 * @property {function} setSize - setter for the puzzle size
 * @property {?Game} game - instance of the Game being played
 * @property {Object[]} board - state of the puzzle board being rendered
 * @property {function} start - function to start the game
 * @property {function(number, number): null} play - function to play a piece at given column and row
 * @property {function} togglePause - pause or resume the game
 * @property {?string} puzzleImage - dynamic path to the current puzzle image
 * @property {function} pickNewImage - selects a new random image for the puzzle
 */

/**
 * State of the game
 * @type {React.Context<{play: (function(number, number): null), puzzleImage: ?string, game: ?Game, setSize: Function, size: {x: number, y: number}, start: Function, togglePause: Function, pickNewImage: Function, board: Object[]}>}
 */
export const GameContext = createContext(/** @type {GameContextType} */ {
    size: {x: 0, y: 0},
    setSize: () => {},
    game: null,
    board: [],
    start: () => {},
    play: (x, y) => {},
    togglePause: () => {},
    puzzleImage: null,
    pickNewImage: () => {},
});

/**
 * Game Context Provider with its state
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 * @constructor
 */
export const GameContextProvider = ({children}) => {
    const [size, setSize] = useState(
        /** @type {{x: number, y: number}} - Number of columns and rows of the puzzle*/
        {x: 4, y: 5}
    );

    const [imagePicked, setImagePicked] = useState(
        /** @type {string} - name of the puzzle image file selected */
        () => pickRandomImage()
    );

    const [puzzleImage, setPuzzleImage] = useState(
        /** @type {?string} - dynamic path to the puzzle image */
        null
    );

    const [game, setGame] = useState(
        /** @type {?Game} - instance of the Game */
        null
    );

    const [board, setBoard] = useState(
        /** @type {?Object[]} - state of the puzzle board being rendered */
        null
    );

    // sets the dynamic path to the image used for the puzzle
    useEffect(() => {
        if (!imagePicked) return;
        setPuzzleImage(require('../assets/images/' + imagePicked ));
    }, [imagePicked ]);

    // creates an instance of the game,
    // the dependency on the imagePicked is here to force re-render when the image changes
    useEffect(() => {
        setGame(new Game({size}));
    }, [size, imagePicked]);

    // sets the puzzle board state, the board is what actually gets rendered by react
    useEffect(() => {
        if (!game) return;
        setBoard(game.getBoard());
    }, [game])

    /**
     * Stats the game and causes re-render of the puzzle board
     * @type {(function(): void)}
     */
    const start = useCallback(() => {
        if (!game) return;
        game.start();
        setBoard(game.getBoard());
    }, [game]);

    /**
     * Plays the piece of the puzzle at the given column and row and causes re-render
     * @type {(function(number, number): void)}
     */
    const play = useCallback((x, y) => {
        if (!game) return;
        const isWon = game.play(x, y);
        setBoard(game.getBoard());
        // re-render the board with a delay to allow a css transition
        if (isWon) {
            setTimeout(() => setBoard(game.getBoard()), 300);
        }
    }, [game]);

    /**
     * Sets pause or resumes the game, and re-renders
     * @type {(function(): void)}
     */
    const togglePause = useCallback(() => {
        if (!game) return;
        game.togglePause();
        setBoard(game.getBoard());
    }, [game]);

    /**
     * Changes the image selected to a new random image
     * @type {(function(): void)}
     */
    const pickNewImage = useCallback(() => {
        setImagePicked(pickRandomImage());
    }, []);

    return (
        <GameContext.Provider value={ /** @type {GameContextType} */ {
            size,
            setSize,
            game,
            board,
            start,
            play,
            togglePause,
            puzzleImage,
            pickNewImage,
        }}>
            {children}
        </GameContext.Provider>
    )
}
