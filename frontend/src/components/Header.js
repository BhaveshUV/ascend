const logo = new URL('./ascend-logo-white.png', import.meta.url);
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { FlashContext } from "../contexts/FlashContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import { LOGOUT_URL } from "../utils/constants";

const Header = () => {
    const { flash, setFlashMessage } = useContext(FlashContext);
    const { currUser, setCurrUser, loading } = useContext(AuthContext);

    const logoutHandler = async () => {
        try {
            const response = await fetch(LOGOUT_URL, {
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                setFlashMessage("success", data.message);
                setCurrUser(null);
                return;
            }
            setFlashMessage("error", data.error);
        } catch (e) {
            setFlashMessage("error", `Request failed: ${e}`);
        }
    }

    return (
        <div className="sticky top-0 z-10">
            <div className="bg-zinc-800 px-2 text-zinc-200 select-none">
                <div className="py-4 flex gap-8 items-center">
                    <img src={logo} height={58} width={128} />
                    <div className="max-[736px]:hidden flex gap-6">
                        <NavLink to={"/"} className={({ isActive }) => `border-transparent border-y-2 leading-12 box-border ${isActive ? "text-[#fedf4b] hover:border-b-[#fedf4b]" : "hover:border-b-white hover:text-white"}`} end>Home</NavLink>
                        <NavLink to={"/listings"} className={({ isActive }) => `border-transparent border-y-2 leading-12 box-border ${isActive ? "text-[#fedf4b] hover:border-b-[#fedf4b]" : "hover:border-b-white hover:text-white"}`} end>All Listings</NavLink>
                        <NavLink to={"/listings/new"} className={({ isActive }) => `border-transparent border-y-2 leading-12 box-border ${isActive ? "text-[#fedf4b] hover:border-b-[#fedf4b]" : "hover:border-b-white hover:text-white"}`} end>Add New Listing</NavLink>
                    </div>
                    <div className="flex gap-2 grow justify-end max-[736px]:hidden">
                        {(!loading && !currUser) && <>
                            <NavLink to={"/login"} className={({ isActive }) => `text-nowrap border-transparent border-y-2 leading-12 ${isActive ? "text-[#fedf4b]" : "hover:text-white"}`}>Log in</NavLink>
                            <NavLink to={"/signup"} className={({ isActive }) => `text-nowrap border-2 rounded leading-none self-center p-1 ${isActive ? "text-[#fedf4b] border-[#fedf4b]" : "border-zinc-200 hover:border-transparent hover:bg-[#fedf4b] hover:text-black"}`}>Sign up</NavLink>
                        </>}
                        {!loading && currUser && <span onClick={() => logoutHandler()} className="text-nowrap border-transparent border-y-2 leading-12 hover:text-white cursor-pointer">Log out</span>}
                    </div>
                    <div className="max-[736px]:flex min-[736px]:hidden flex-col gap-2 px-1 py-2 absolute right-2 cursor-pointer hover:text-white" onClick={() => { document.getElementById("optional-navbar").classList.toggle("max-h-0"); document.getElementById("optional-navbar").classList.toggle("max-h-60") }}>
                        <span className="border-b-2 w-8"></span>
                        <span className="border-b-2 w-8"></span>
                        <span className="border-b-2 w-8"></span>
                    </div>
                </div>
                <div id="optional-navbar" className="min-[736px]:h-0 max-h-0 flex flex-col px-2 text-zinc-200 overflow-hidden transition-[max-height] duration-300 ease-in-out">
                    <NavLink to={"/"} onClick={() => { document.getElementById("optional-navbar").classList.add("max-h-0"); document.getElementById("optional-navbar").classList.remove("max-h-60") }} className={({ isActive }) => `leading-12 ${isActive ? "text-[#fedf4b]" : "hover:text-white"}`} end>Home</NavLink>
                    <NavLink to={"/listings"} onClick={() => { document.getElementById("optional-navbar").classList.add("max-h-0"); document.getElementById("optional-navbar").classList.remove("max-h-60") }} className={({ isActive }) => `leading-12 ${isActive ? "text-[#fedf4b]" : "hover:text-white"}`} end>All Listings</NavLink>
                    <NavLink to={"/listings/new"} onClick={() => { document.getElementById("optional-navbar").classList.add("max-h-0"); document.getElementById("optional-navbar").classList.remove("max-h-60") }} className={({ isActive }) => `leading-12 ${isActive ? "text-[#fedf4b]" : "hover:text-white"}`} end>Add New Listing</NavLink>
                    {!loading && !currUser && <>
                        <NavLink to={"/login"} onClick={() => { document.getElementById("optional-navbar").classList.add("max-h-0"); document.getElementById("optional-navbar").classList.remove("max-h-60") }} className={({ isActive }) => `leading-12 ${isActive ? "text-[#fedf4b]" : "hover:text-white"}`}>Log in</NavLink>
                        <NavLink to={"/signup"} onClick={() => { document.getElementById("optional-navbar").classList.add("max-h-0"); document.getElementById("optional-navbar").classList.remove("max-h-60") }} className={({ isActive }) => `leading-12 ${isActive ? "text-[#fedf4b]" : "hover:text-white"}`}>Sign up</NavLink>
                    </>}
                    {!loading && currUser && <span onClick={() => { document.getElementById("optional-navbar").classList.add("max-h-0"); document.getElementById("optional-navbar").classList.remove("max-h-60"); logoutHandler() }} className="leading-12 hover:text-white cursor-pointer">Log out</span>}
                </div>
            </div>
            {flash && <div className={`${flash.type === 'success' ? 'bg-green-300 p-2' : ''} ${flash.type === 'error' ? 'bg-red-300 p-2' : ''} text-center absolute w-full box-border min-h-8`}>{flash.message}</div>}
        </div>
    )
}

export default Header;