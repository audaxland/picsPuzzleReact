import ControlButton from "../components/controls/ControlButton";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import SelectionIconButton from "../components/controls/SelectionIconButton";
import {IoIosPhoneLandscape, IoIosPhonePortrait} from "react-icons/io";
import {GameContext} from "../store/GameContext";
import {BsGrid3X2Gap} from "react-icons/bs";
import SelectionGroupLayout from "../components/layout/SelectionGroupLayout";

/**
 * Constants to designate the orientation of the puzzle
 */
const LANDSCAPE = 'landscape';
const PORTRAIT = 'portrait';

/**
 * List of available puzzle sizes to select from
 * @type {{sizeOption: string, name: string}[]}
 */
const sizeList = [
    {name: 'Easy', sizeOption: '3x4'},
    {name: 'Moderate', sizeOption: '4x5'},
    {name: 'Intermediate', sizeOption: '5x7'},
    {name: 'Advanced', sizeOption: '7x9'},
    {name: 'Expert', sizeOption: '9x12'},
    {name: 'Insane', sizeOption: '12x15'},
];

/**
 * Renders the menu to select the orientation and the size of the puzzle
 * @returns {JSX.Element}
 * @constructor
 */
const SelectSize = () => {
    const navigate = useNavigate();

    /**
     * @type {import('../../store/GameContext').GameContextType}
     */
    const {size, setSize} = useContext(GameContext);

    /**
     * layout selected for the puzzle
     */
    const [layout, setLayout] = useState(/** @type {string}*/ () => (
        // choose as default value the orientation that best matches the dimensions of the screen
        (window.innerWidth > window.innerHeight) ? LANDSCAPE : PORTRAIT
    ));

    /**
     * Handler to update the selected size for the puzzle
     * @param {string} newSize - name or value of the size to select (format like 3x4)
     * @returns {(function(): void)|*}
     */
    const changeSize = newSize => () => {
        const [a,b] = newSize.split('x');
        // convert the size of a format "3x4" to number of columns and rows
        // that correspond to the chosen orientation
        setSize({
            x: Number(layout === PORTRAIT ? a : b),
            y: Number(layout === PORTRAIT ? b : a),
        })
    }

    /**
     * Handle the orientation state update
     * @param {string} newLayout - orientation for the puzzle, either 'landscape' or 'portrait'
     * @returns {(function(): void)|*}
     */
    const changeLayout = newLayout => () => {
        setLayout(newLayout);
        // changing the orientation also changes the number of columns and rows
        // that correspond to the selected size
        const {x, y} = size;
        setSize({
            x: Number(newLayout === PORTRAIT ? Math.min(x, y) : Math.max(x, y)),
            y: Number(newLayout === PORTRAIT ? Math.max(x, y) : Math.min(x, y)),
        })
    }

    return (
        <>
            <SelectionGroupLayout
                label="Select Layout"
                className="md:grid-cols-1"
            >
                <SelectionIconButton
                    onClick={changeLayout(LANDSCAPE)}
                    icon={<IoIosPhoneLandscape />}
                    text="Orientation"
                    active={layout === LANDSCAPE}
                >
                    Landscape
                </SelectionIconButton>
                <SelectionIconButton
                    onClick={changeLayout(PORTRAIT)}
                    icon={<IoIosPhonePortrait />}
                    text="Orientation"
                    active={layout === PORTRAIT}
                >
                    Portrait
                </SelectionIconButton>
            </SelectionGroupLayout>

            <SelectionGroupLayout
                label="Select Size"
                className="sm:grid-cols-3"
            >
                {sizeList.map(({name, sizeOption}) => (
                    <SelectionIconButton
                        key={sizeOption}
                        onClick={changeSize(sizeOption)}
                        icon={<BsGrid3X2Gap />}
                        text={name}
                        active={sizeOption === (
                            Math.min(size?.x ?? 0, size?.y ?? 0)
                            + 'x'
                            + Math.max(size?.x ?? 0, size?.y ?? 0)
                        )}
                    >
                        {sizeOption}
                    </SelectionIconButton>
                ))}
            </SelectionGroupLayout>

            <div className="flex flex-wrap justify-center items-center">
                <div className="flex justify-center items-center">
                    <ControlButton onClick={() => navigate('/')}>Go To Game</ControlButton>
                </div>
            </div>
        </>
    );
}

export default SelectSize;
