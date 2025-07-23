import { Outlet } from "react-router";

const Background = () => {
    return (
        <div className="px-4 pt-8 flex-1 flex flex-col bg-zinc-100 bg-[url('https://cdn.pixabay.com/photo/2023/02/03/05/18/abstract-7764192_1280.jpg')] bg-fixed">
            <div className="flex-1 w-full flex flex-col bg-zinc-100">
                <Outlet />
            </div>
        </div>
    )
}

export default Background;