import PuzzlePiece from "./PuzzlePiece";

/**
 * The Game handles the logic of the puzzle
 */
class Game
{
    /**
     * @param {{x: number, y: number}} size - number of rows and columns of the puzzle
     */
    constructor({size = {x: 4, y: 5}}) {
        /**
         * @type {{x: number, y: number}} number of rows and columns of the puzzle
         */
        this.size = size;

        /**
         * @type {PuzzlePiece[]} contains all the pieces of the puzzle
         */
        this.puzzle = [];
        [...Array(size.x).keys()].forEach(x => {
            [...Array(size.y).keys()].forEach(y => {
                this.puzzle.push(new PuzzlePiece({x, y}));
            })
        });

        /**
         * @type {?number} time the game started as milliseconds timestamp
         */
        this.startTime = null;

        /**
         * @type {?number} time the game was paused as milliseconds timestamp
         */
        this.pauseTime = null;

        /**
         * @type {?number} time the game was finished as milliseconds timestamp
         */
        this.endTime = null;

        /**
         * @type {?{x: number, y: number}[]} list of moves that where made during the game
         */
        this.moves = null;

        /**
         * @type {?{x: number, y: number}} position of the piece that was removed when the game starts
         */
        this.removedPiece = null;

        /**
         * @type {?{x: number, y: number}} current position of the empty slot in the puzzle
         */
        this.slot = null;

        /**
         * @type {boolean} flag to indicate that the game is finished
         */
        this.gameWon = false;
    }

    /**
     * Returns a copy of the state of th board, this is used to update the React state of the puzzle
     * and cause re-render of the game components
     * @returns {{imgX: number, imgY: number, canPlay: boolean, x: number, y: number, id: string, moveTo(number, number): void}[]}
     */
    getBoard() {
        return this.puzzle.map(/** @param {PuzzlePiece} piece */ piece => ({
            ...piece,
            canPlay: this.canPlay(piece.x, piece.y),
        }));
    }

    /**
     * Starts the game
     */
    start () {
        // if this.slot already exists that means the game is already started, so return early
        if (this.slot) return;

        // store the column and row of the piece that we remove to create the slot
        this.removedPiece = {x: 0, y: 0};

        // initialize the position of the slot
        this.slot = {...this.removedPiece};

        // remove the piece for the slot
        this.puzzle = this.puzzle.filter(({x, y}) => !((x === this.slot.x) && (y === this.slot.y)))

        // shuffle the pieces of the game so that there is something to solve
        this.shuffle(1000000);

        // initialize the start time of the game, in timestamp milliseconds
        this.startTime = (new Date()).getTime();

        // initialize the pause time, finish time, and won flag,
        // (this is not necessary as the game cannot be started more than once, and these are the default values)
        this.pauseTime = null;
        this.endTime = null;
        this.gameWon = false;

        // initialize the list of moves made to an empty array
        this.moves = [];
    }

    /**
     * Determines if the piece at a given column and row can currently be played
     * @param {number} x - column of the piece to check
     * @param {number} y - row of the piece to check
     * @returns {boolean} true if the piece can be played, false otherwise
     */
    canPlay (x, y) {
        // if the game is not started, no piece can be moved,
        if (!this.slot) return false; // should never happen, but check just in case

        // the piece can only be played if it is adjacent to the slot
        if ((x === this.slot.x) && (y === this.slot.y)) return false;
        if ((x === this.slot.x) && (Math.abs(y - this.slot.y) === 1)) {
            return true;
        }
        if ((y === this.slot.y) && (Math.abs(x - this.slot.x) === 1)) {
            return true;
        }
        return false;
    }

    /**
     * Plays the piece at the given column and row
     * @param {number} x - column of the piece to move
     * @param {number} y - row of the piece to move
     */
    play (x, y) {
        if (this.move(x, y)) {
            this.moves.push({x, y});
            return this.checkIfWon ();
        }
        return false;
    }

    /**
     * Moves a given piece of the puzzle (when played or shuffled)
     * @param {number} x - column of the piece to move
     * @param {number} y - row of the piece to move
     * @returns {boolean} true if the piece was moved and false otherwise
     */
    move (x, y) {
        if (!this.canPlay(x, y)) {
            return false;
        }
        // move the piece
        this.puzzle
            .find(piece => (piece.x === x) && (piece.y === y))
            .moveTo(this.slot.x, this.slot.y);
        // update the slot to the previous position of the moved piece
        this.slot = {x, y};
        return true;
    }

    /**
     * Returns the number of seconds elapsed since the game was started (excluding the paused time)
     * @returns {number} elapsed time in seconds
     */
    getElapsedTime () {
        // game not started means no time elapsed
        if (!this.startTime) {
            return 0;
        }
        // game finished, so only return the time it took to finish the game
        if (this.endTime) {
            return Math.floor((this.endTime - this.startTime)/1000);
        }

        // if the game is on pause, exclude the paused time
        if (this.pauseTime) {
            return Math.floor((this.pauseTime - this.startTime)/1000);
        }

        // elapsed time while the game is played
        return Math.floor(((new Date()).getTime() - this.startTime)/1000);
    }

    /**
     * Checks if the game is finished, and if so, set the attributes of the game as won
     * @returns {boolean} returns true if the game is finished and false otherwise
     */
    checkIfWon () {
        //if the game was previously won, just return
        if (this.gameWon) return true;

        // is any piece of the puzzle is not in its final position, then the game is not finished
        const isWon = this.puzzle.reduce((prev, curr) => {
            if ((!prev) || (curr.x !== curr.imgX) || (curr.y !== curr.imgY)) {
                return false;
            }
            return prev;
        }, true);

        // if the game is won, update the attributes of the game object
        if (isWon) {
            this.gameWon = isWon;
            // set end time in timestamp milliseconds
            this.endTime = (new Date()).getTime();
            // add back to the puzzle the piece that was removed when the game started
            const lastPiece = new PuzzlePiece({...this.removedPiece});
            // move the piece out of the board to allow a transition in
            lastPiece.moveTo(-1,-1);
            this.puzzle.push(lastPiece);
            // move the piece back to it's correct position
            setTimeout(() => lastPiece.moveTo(lastPiece.imgX, lastPiece.imgY), 100)
            // remove the slot and removed piece as no piece is now missing
            this.slot = null;
            this.removedPiece = null;
        }
        return isWon;
    }

    /**
     * Returns the list of pieces of the puzzle that can currently be played
     * @param {?PuzzlePiece} [excludePiece] - optional piece to exclude of the list
     * @returns {PuzzlePiece[]}
     */
    possibleMoves (excludePiece = null) {
        return this.puzzle.filter(({x, y, id}) => (
            this.canPlay(x, y) && (id !== excludePiece?.id))
        );
    }

    /**
     * Shuffle the pieces of the puzzle.
     * Note that it is not possible to just randomly place the pieces of the puzzle,
     * as some combinations of pieces layout can result in a puzzle that has no solution.
     * That is why we start with the solved puzzle and move one piece at the time, to be sure
     * that the resulting positions form a game that can be won.
     * @param {number} [rounds] number of random moves to make to shuffle the game
     */
    shuffle(rounds = 1000) {
        let possibleMoves = [];
        let pieceToMove = null;
        for (let round = 0 ; round < rounds ; round++) {
            // find all possible moves other than the last move made
            possibleMoves = this.possibleMoves(pieceToMove);
            // pick a random move other than the last move made
            pieceToMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.move(pieceToMove.x, pieceToMove.y);
        }
        // move the slot to the top left corner
        this.slotToPosition(0, 0);
    }

    /**
     * Makes needed moves to make the slot go from where it is to the given column and row
     * @param {number} x - column of the slot to go to
     * @param {number} y - row of the slot to go to
     */
    slotToPosition (x, y) {
        let bestMove;
        while ((this.slot.x !== x) || (this.slot.y !== y)) {
            bestMove = this.possibleMoves()
                .reduce((prev, curr) => {
                    const distance = Math.abs(curr.x - x) + Math.abs(curr.y - y);

                    if ((!prev) || (prev?.distance > distance)) {
                        return {piece: curr, distance}
                    }
                    return prev
                }, null);
            this.move(bestMove.piece.x, bestMove.piece.y);
        }
    }

    /**
     * Set pause or resume game
     */
    togglePause() {
        // pause does not apply when the game is not started
        if (!this.startTime) return; // this should never happen, but just in case..
        if (this.pauseTime) { // if game paused, then resume game
            // change the start time so that the elapsed time is calculated excluding the paused time
            this.startTime = (new Date()).getTime() - (this.pauseTime - this.startTime);
            this.pauseTime = null;
        } else {
            this.pauseTime = (new Date()).getTime();
        }
    }
}

export default Game;
