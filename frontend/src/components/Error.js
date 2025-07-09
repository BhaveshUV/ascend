import { useRouteError } from "react-router";

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
        <div className="mx-auto py-8 px-4 bg-zinc-100 h-[100dvh] flex flex-col gap-4 items-center">
            <h1 className="text-6xl">{err.status}</h1>
            <span className="text-gray-600 font-semibold">{err.statusText}</span>
            <span className="text-gray-600">{err.error.message}</span>
        </div>
    )
}

export default Error;