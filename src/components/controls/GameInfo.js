/**
 * Renders an individual game information, with an Icon, a Label and a Value
 * @param {?JSX.Element} icon icon to render
 * @param {string} label information label
 * @param {string|number|JSX.Element} children information content (value)
 * @returns {JSX.Element}
 * @constructor
 */
const GameInfo = ({icon = null, label = '', children}) => {
    return (
        <div
            className="flex flex-row md:flex-col justify-center items-center gap-2 text-indigo-800
            bg-[#edf8] py-1 px-2 rounded-xl flex-1 md:flex-none"
        >
            <div className="text-xl md:text-5xl font-bold">
                {icon}
            </div>
            <div className="flex flex-row items-center gap-2 justify-center text-sm md:text-md">
                <span>
                    {(!!label) && label + ':'}
                </span>
                <div className="font-bold">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default GameInfo;
