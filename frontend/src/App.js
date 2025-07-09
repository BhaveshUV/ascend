const logo = new URL('./ascend-logo-white.png', import.meta.url);
import AllListings from "./components/AllListings";

const App = () => {
    return (
        <div>
            <div className="bg-zinc-800 py-4 px-2 sticky top-0">
                <img src={logo} width={128} />
            </div>
            <AllListings />
        </div>
    );
}

export default App;