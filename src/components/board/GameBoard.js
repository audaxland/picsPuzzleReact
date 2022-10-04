import BoardCell from "./BoardCell";

const cells = [...Array(4).keys()].map(x => (
    [...Array(5).keys()].map(y => ({x,y, imgX: x, imgY: y, id: x + '_' + y}))
));
console.log(cells)

const GameBoard = ({}) => {
    return (
        <div
            className="relative bg-[#ccc5] w-[400px] h-[500px]"
        >
            {cells.map(col => col.map(cell => (
                <BoardCell key={cell.id} {...cell} />
            )))}
        </div>
    );
}

export default GameBoard;