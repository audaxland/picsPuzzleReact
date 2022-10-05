import ControlButton from "../components/controls/ControlButton";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import SelectionIconButton from "../components/controls/SelectionIconButton";
import {IoIosPhoneLandscape, IoIosPhonePortrait} from "react-icons/io";
import {GameContext} from "../store/GameContext";
import {BsGrid3X2Gap} from "react-icons/bs";
import SelectionGroupLayout from "../components/layout/SelectionGroupLayout";

const LANDSCAPE = 'landscape';
const PORTRAIT = 'portrait';


const sizeList = [
    {name: 'Easy', sizeOption: '3x4'},
    {name: 'Moderate', sizeOption: '4x5'},
    {name: 'Intermediate', sizeOption: '5x7'},
    {name: 'Advanced', sizeOption: '7x9'},
    {name: 'Expert', sizeOption: '9x12'},
    {name: 'Insane', sizeOption: '12x15'},
]

const SelectSize = () => {
    const navigate = useNavigate();
    const {size, setSize} = useContext(GameContext);
    const [layout, setLayout] = useState(() => (
        (window.innerWidth > window.innerHeight) ? LANDSCAPE : PORTRAIT
    ));

    const changeSize = newSize => () => {
        const [a,b] = newSize.split('x');
        setSize({
            x: Number(layout === PORTRAIT ? a : b),
            y: Number(layout === PORTRAIT ? b : a),
        })
    }

    const changeLayout = newLayout => () => {
        setLayout(newLayout);
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
                mdCols={1}
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
                smCols={3}
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

            <div
                className="flex flex-wrap justify-center items-center"
            >
                <div
                className="flex justify-center items-center">
                    <ControlButton onClick={() => navigate('/game')}>Go To Game</ControlButton>
                </div>

            </div>
        </>
    );
}

export default SelectSize;