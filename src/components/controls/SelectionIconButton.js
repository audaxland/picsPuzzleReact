const SelectionIconButton = ({icon, text, onClick, active, children}) => {
    return (
        <button
            onClick={onClick}
            className={"rounded-xl p-2 bg-gradient-to-r " +
                (active ? " from-amber-500 to-indigo-600 text-indigo-900 shadow-md shadow-indigo-300"
                    : " from-stone-400 to-slate-500  text-gray-600 ")}
        >
            <div
                className="flex flex-col items-center bg-[#ddd7] hover:bg-transparent rounded-xl p-1 md:p-2
                hover:text-white active:bg-[#ddd3] gap-1"
            >

                <div
                    className="flex flex-col items-center "
                >
                    <span
                        className="text-xs"
                    >
                        {text}
                    </span>
                        <span
                            className="text-md md:text-lg font-bold"
                        >
                        {children}
                    </span>
                </div>

                <span
                    className="text-2xl sm:text-3xl md:text-5xl"
                >
                    {icon}
                </span>
            </div>
        </button>
    );
}

export default SelectionIconButton;