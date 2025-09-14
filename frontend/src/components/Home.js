import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useContext } from "react";

const Home = () => {
    const { currUser, loading } = useContext(AuthContext);

    return (
        <div className="flex-1 flex flex-col h-full justify-center items-center px-8 cursor-default overflow-hidden relative select-none">
            <span className="text-9xl text-[#fedf4b] font-black scale-[1000%] lg:scale-[1700%] rotate-45 translate-x-[200%] translate-y-4/12 absolute">O</span>
            <div className="text-4xl font-extrabold z-10 max-md:self-start">Welcome to Ascend!</div>
            {
                !loading && !currUser ? <div className="text-2xl text-zinc-700 font-bold z-10 max-md:self-start"><Link to="/signup" className="cursor-pointer underline text-nowrap">Sign up</Link> or <Link to="/login" className="cursor-pointer underline text-nowrap">Log in</Link> now</div>
                    : <div className="text-2xl text-zinc-700 font-bold z-10 max-md:self-start">View <Link to="/listings" className="cursor-pointer underline text-nowrap">All Listings</Link></div>
            }
        </div>
    )
}

export default Home;