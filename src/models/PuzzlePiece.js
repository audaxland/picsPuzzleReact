class PuzzlePiece
{
    /**
     * @param {number} x - column of the piece in the puzzle
     * @param {number} y - row of the piece in the puzzle
     */
    constructor({x, y}) {
        /**
         * @type {number} - current column of the piece in the puzzle
         */
        this.x = x;

        /**
         * @type {number} - current row of the piece in the puzzle
         */
        this.y = y;

        /**
         * @type {number} - final column of the piece in the puzzle (once the game is won)
         */
        this.imgX = x;

        /**
         * @type {number} - final rox of the piece in the puzzle (once the game is won)
         */
        this.imgY = y;

        /**
         * @type {string} unique identifier of the piece (use as key inside a map() render)
         */
        this.id = x + '_' + y;
    }

    /**
     * Moves the piece the given column and row in the puzzle
     * @param {number} x - column to move the piece to
     * @param {number} y - row to move the piece to
     */
    moveTo (x, y) {
        this.x = x;
        this.y = y;
    }
}

export default PuzzlePiece;