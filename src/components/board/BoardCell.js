import puzzleImage from '../../assets/images/tiger.jpg';

const BoardCell = ({x, y, imgX, imgY}) => {

    return (
        <div
            style={{
                top: y * 100,
                left: x * 100,
                border: '1px solid #fff3'
            }}
            className="absolute w-[100px] h-[100px] overflow-hidden transition duration-300 ease-in-out"
        >
            <div
                style={{
                    backgroundImage: `url('${puzzleImage}')`,
                    top: -1 * imgY * 100,
                    left: -1 * imgX * 100,

                }}
                className="h-[500px] w-[400px] bg-cover bg-center absolute"
            />
        </div>
    );
}

export default BoardCell;