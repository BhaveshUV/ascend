import { useRouteError } from "react-router";
import { Link } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    console.dir(err);
    return (
        <div className="mx-auto w-full py-8 px-4 bg-zinc-100 h-[100dvh] flex flex-col gap-4 items-center relative cursor-default">
            <h1 className="text-6xl">{err.status || "Something went wrong"}</h1>
            <span className="text-gray-600 font-semibold">{err.statusText}</span>
            <span className="text-gray-600">{err.error?.message || err.data}</span>
            <Link to="/listings" className="rounded px-2 border-2 hover:bg-zinc-200 absolute left-8">Go to all Listings</Link>
        </div>
    )
}

export default Error;