import PuzzlePiece from "./PuzzlePiece";

class Game
{
    constructor({size = {x: 4, y: 4}}) {
        this.size = size;
        this.puzzle = [];
        [...Array(size.x).keys()].forEach(x => {
            [...Array(size.y).keys()].forEach(y => {
                this.puzzle.push(new PuzzlePiece({x, y}));
            })
        });
        this.startTime = null;
        this.endTime = null;
        this.moves = null;
        this.removedPiece = null;
        this.slot = null;
        this.gameWon = false;
    }

    getBoard() {
        return this.puzzle.map(piece => ({
            ...piece,
            canPlay: this.canPlay(piece.x, piece.y),
        }));
    }

    start () {
        if (this.slot) return;
        this.removedPiece = {x: 0, y: 0};
        this.slot = {...this.removedPiece};
        this.puzzle = this.puzzle.filter(({x, y}) => !((x === this.slot.x) && (y === this.slot.y)))
        this.shuffle(10000);
        this.startTime = (new Date()).getTime();
        this.endTime = null;
        this.moves = [];
        this.gameWon = false;

    }

    canPlay (x, y) {
        if (!this.slot) return false;
        if ((x === this.slot.x) && (y === this.slot.y)) return false;
        if ((x === this.slot.x) && (Math.abs(y - this.slot.y) === 1)) {
            return true;
        }
        if ((y === this.slot.y) && (Math.abs(x - this.slot.x) === 1)) {
            return true;
        }
        return false;
    }

    play (x, y) {
        if (this.move(x, y)) {
            this.moves.push({x, y});
            this.checkIfWon ();
        }
    }

    move (x, y) {
        if (!this.canPlay(x, y)) {
            return false;
        }
        this.puzzle
            .find(piece => (piece.x === x) && (piece.y === y))
            .moveTo(this.slot.x, this.slot.y);
        this.slot = {x, y};
        return true;
    }

    getElapsedTime () {
        if (!this.startTime) {
            return 0;
        }
        if (this.endTime) {
            return Math.floor((this.endTime - this.startTime)/1000);
        }
        return Math.floor(((new Date()).getTime() - this.startTime)/1000);
    }

    checkIfWon () {
        if (this.gameWon) return true;
        const isWon = this.puzzle.reduce((prev, curr) => {
            if ((!prev) || (curr.x !== curr.imgX) || (curr.y !== curr.imgY)) {
                return false;
            }
            return prev;
        }, true);
        if (isWon) {
            this.gameWon = isWon;
            this.endTime = (new Date()).getTime();
            this.puzzle.push(new PuzzlePiece({...this.removedPiece}));
            this.slot = null;
            this.removedPiece = null;
        }
        return isWon;
    }


    possibleMoves (excludePiece = null) {
        return this.puzzle.filter(({x, y, id}) => (
            this.canPlay(x, y) && (id !== excludePiece?.id))
        );
    }

    shuffle(rounds = 1000) {
        let possibleMoves = [];
        let pieceToMove = null;
        for (let round = 0 ; round < rounds ; round++) {
            possibleMoves = this.possibleMoves(pieceToMove);

            pieceToMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.move(pieceToMove.x, pieceToMove.y);
        }
        this.slotToPosition(0, 0);
    }

    slotToPosition (x, y) {
        let bestMove;
        while ((this.slot.x !== x) || (this.slot.y !== y)) {
            bestMove = this.possibleMoves()
                .reduce((prev, curr) => {
                    const distance = Math.abs(curr.x - x) + Math.abs(curr.y - y);

                    if ((!prev) || (prev.distance > distance)) {
                        return {piece: curr, distance}
                    }
                    return prev
                }, null);
            this.move(bestMove.piece.x, bestMove.piece.y);
        }
    }
}

export default Game;