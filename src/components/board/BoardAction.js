/**
 * Button rendered on top of the board over a gradient background
 * @component
 * @param {string|JSX.Element} children - content of the button
 * @param {function} onClick - callback for button click
 * @returns {JSX.Element}
 * @constructor
 */
const BoardAction = ({children, onClick}) => {
    return (
        <div
            className="z-20 absolute w-full h-full flex items-center justify-center"
        >
            <div
                className="bg-gradient-to-br from-[#fd2a] to-[#03da]
                            w-full flex items-center justify-center py-16"
            >
                <button
                    className="bg-gradient-to-r from-blue-200 to-indigo-400 rounded-full
                                 px-4 py-2 text-lg md:text-xl text-indigo-900 border-2 border-indigo-800
                                 hover:to-purple-800 hover:from-fuchsia-700 hover:text-white
                                 relative hover:-top-1 transition-all duration-300
                                 hover:shadow-lg hover:shadow-indigo-400
                                 flex flex-row gap-2 items-center justify-center
                                 active:from-fuchsia-600 active:to-purple-600"
                    onClick={onClick}
                >
                    {children}
                </button>
            </div>
        </div>
    );
}

export default BoardAction;