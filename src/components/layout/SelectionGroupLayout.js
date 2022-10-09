/**
 * Layout around a group of buttons to select from,
 * used to select size and orientation
 * @param {string|JSX.Element} label - title to display above the group of options
 * @param {string} className - additional classes to apply to the div around the options
 * @param {JSX.Element|JSX.Element[]} children - JSX for the option buttons
 * @returns {JSX.Element}
 * @constructor
 */
const SelectionGroupLayout = ({label, className, children}) => {
    return (
        <div className="bg-[#fff2] p-2 rounded-lg">
            <div className="text-center text-lg font-bold text-indigo-800 pb-3">
                {label}
            </div>
            <div className={"grid grid-cols-2 gap-2 " + className}>
                {children}
            </div>
        </div>
    );
}

export default SelectionGroupLayout;