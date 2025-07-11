import { useRouteError, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    console.dir(err);
    
    const navigate = useNavigate();
    let clickHandler = () => {
        navigate(-1);
    }

    return (
        <div className="mx-auto w-full py-8 px-4 bg-zinc-100 h-[100dvh] flex flex-col gap-4 items-center cursor-default">
            <h1 className="text-6xl">{err.status || "Something went wrong"}</h1>
            <span className="text-gray-600 font-semibold">{err.statusText}</span>
            <span className="text-gray-600">{err.error?.message || err.data}</span>
            <div className="flex gap-2">
                <button className="rounded px-2 border-2 hover:bg-zinc-200 cursor-pointer" onClick={clickHandler}>Go back</button>
                <Link to="/listings" className="rounded px-2 border-2 hover:bg-zinc-200">Go to all Listings</Link>
            </div>
        </div>
    )
}

export default Error;