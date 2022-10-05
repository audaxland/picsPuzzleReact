const FoundationLayout = ({children}) => {
    return (
        <div
            className="bg-[url('./assets/images/background.jpg')] bg-cover"
        >
            <div
                className="bg-gradient-to-br from-[#fd2a] to-[#03da] min-h-screen flex items-center justify-center"
            >
                <div
                    className="flex flex-col md:flex-row gap-6 p-4 bg-[#daf4] rounded-lg"
                >
                    {children}
                </div>
            </div>
        </div>

    );
}

export default FoundationLayout;