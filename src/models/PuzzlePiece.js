class PuzzlePiece
{
    constructor({x, y}) {
        this.x = x;
        this.y = y;
        this.imgX = x;
        this.imgY = y;
        this.id = x + '_' + y;
    }

    moveTo (x, y) {
        this.x = x;
        this.y = y;
    }
}

export default PuzzlePiece;