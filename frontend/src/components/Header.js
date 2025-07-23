const logo = new URL('./ascend-logo-white.png', import.meta.url);
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-zinc-800 px-2 sticky top-0 z-10 text-zinc-200 select-none">
            <div className="py-4 flex gap-8 items-center">
                <img src={logo} height={58} width={128} />
                <div className="max-[736px]:hidden flex gap-6">
                    <NavLink to={"/"} className={({ isActive }) => `border-transparent border-y-2 leading-12 box-border ${isActive ? "text-[#fedf4b] hover:border-b-[#fedf4b]" : "hover:border-b-white hover:text-white"}`} end>Home</NavLink>
                    <NavLink to={"/listings"} className={({ isActive }) => `border-transparent border-y-2 leading-12 box-border ${isActive ? "text-[#fedf4b] hover:border-b-[#fedf4b]" : "hover:border-b-white hover:text-white"}`} end>All Listings</NavLink>
                    <NavLink to={"/listings/new"} className={({ isActive }) => `border-transparent border-y-2 leading-12 box-border ${isActive ? "text-[#fedf4b] hover:border-b-[#fedf4b]" : "hover:border-b-white hover:text-white"}`} end>Add New Listing</NavLink>
                </div>
                <div className="max-[736px]:flex min-[736px]:hidden flex-col gap-2 px-1 py-2 absolute right-2 cursor-pointer hover:text-white" onClick={() => {document.getElementById("optional-navbar").classList.toggle("max-h-0"); document.getElementById("optional-navbar").classList.toggle("max-h-52")}}>
                    <span className="border-b-2 w-8"></span>
                    <span className="border-b-2 w-8"></span>
                    <span className="border-b-2 w-8"></span>
                </div>
            </div>
            <div id="optional-navbar" className="min-[736px]:h-0 max-h-0 flex flex-col px-2 text-zinc-200 overflow-hidden transition-[max-height] duration-300 ease-in-out">
                <NavLink to={"/"} onClick={() => {document.getElementById("optional-navbar").classList.add("max-h-0"); document.getElementById("optional-navbar").classList.remove("max-h-52")}} className={({ isActive }) => `leading-12 ${isActive ? "text-[#fedf4b]" : "hover:text-white"}`} end>Home</NavLink>
                <NavLink to={"/listings"} onClick={() => {document.getElementById("optional-navbar").classList.add("max-h-0"); document.getElementById("optional-navbar").classList.remove("max-h-52")}} className={({ isActive }) => `leading-12 ${isActive ? "text-[#fedf4b]" : "hover:text-white"}`} end>All Listings</NavLink>
                <NavLink to={"/listings/new"} onClick={() => {document.getElementById("optional-navbar").classList.add("max-h-0"); document.getElementById("optional-navbar").classList.remove("max-h-52")}} className={({ isActive }) => `leading-12 ${isActive ? "text-[#fedf4b]" : "hover:text-white"}`} end>Add New Listing</NavLink>
            </div>
        </div>
    )
}

export default Header;