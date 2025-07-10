import { Outlet } from "react-router";
import Header from "./components/Header";

const App = () => {
    return (
        <div className="flex flex-col flex-1">
            <Header />
            <Outlet />
        </div>
    );
}

export default App;