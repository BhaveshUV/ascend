const logo = new URL('./ascend-logo-white.png', import.meta.url);

const Header = () => {
    return (
        <div className="bg-zinc-800 py-4 px-2 sticky top-0 z-10">
            <img src={logo} width={128} />
        </div>
    )
}

export default Header;