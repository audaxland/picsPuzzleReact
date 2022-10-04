const ControlButton = ({children, ...rest}) => {
    return (
        <button
            {...rest}
            className="w-full border-2 border-indigo-600 px-4 py-2 rounded-full bg-indigo-300
            hover:bg-indigo-700 active:bg-indigo-900 relative hover:-top-1 transition duration-300
            hover:text-indigo-100 hover:border-indigo-300
            hover:shadow-md hover:shadow-indigo-300"
        >
            {children}
        </button>
    );
}

export default ControlButton;