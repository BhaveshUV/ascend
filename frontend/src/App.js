import Header from "./components/Header";
import Background from "./components/Background";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div className="flex flex-col flex-1">
            <Header />
            <Background />
            <Footer />
        </div>
    );
}

export default App;