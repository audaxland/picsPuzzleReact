const GameInfo = ({icon = null, label = '', children}) => {
    return (
        <div
            className="flex flex-row sm:flex-col justify-center items-center gap-2 text-indigo-800
            bg-[#dcf3] py-1 px-2 rounded-xl"
        >
            <div
                className="text-2xl sm:text-5xl font-bold"
            >
                    {icon}
                </div>
            <div
                className="flex flex-row items-center gap-2 justify-center"
            >
                <span>
                    {label}:
                </span>
                <div
                    className="font-bold"
                >
                    {children}
                </div>
            </div>

        </div>
    );
}

export default GameInfo;