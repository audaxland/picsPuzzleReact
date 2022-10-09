/**
 * Outer wrapper of the entire app,
 * places the app content in the center of the screen and sets a top level background
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const FoundationLayout = ({children}) => {
    return (
        <div className="bg-[url('./assets/images/background.jpg')] bg-cover bg-center">
            <div
                className="bg-gradient-to-br from-[#fd2a] to-[#03da] min-h-screen flex items-center justify-center"
            >
                <div className="flex flex-col md:flex-row gap-6 p-4 bg-[#daf4] rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default FoundationLayout;
