import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ALL_LISTINGS_URL } from "../utils/constants";

const ListingForm = ({ listing, setIsForm }) => {
    if (!listing) {
        listing = {};
    }
    const [title, setTitle] = useState(listing.title || "");
    const [description, setDescription] = useState(listing.description || "");
    const [imgURL, setImgURL] = useState(listing.image || "");
    const [amount, setAmount] = useState(listing.price || "");
    const [location, setLocation] = useState(listing.location || "");
    const [country, setCountry] = useState(listing.country || "");

    const navigate = useNavigate();

    let editHandler = async (e) => {
        e.preventDefault();
        let updatedForm = { title, description, image: imgURL, price: amount, location, country };
        try {
            const response = await fetch(`${ALL_LISTINGS_URL}/${listing._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedForm)
            });
            if (response.ok) {
                navigate(0);
                setIsForm(false);
                window.alert("Update successful");
            } else {
                const error = await response.json();
                window.alert("Error updating the listing: ", error);
            }
        } catch (e) {
            window.alert("Request failed: ", e);
        }
    }

    let createHandler = async (e) => {
        document.getElementById("create-btn").disabled = true;
        e.preventDefault();
        let form = { title, description, image: imgURL, price: amount, location, country, by: "Default-user" };
        try {
            const response = await fetch(ALL_LISTINGS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            if (response.ok) {
                navigate(-1);
                window.alert("Listing created successfully")
                return;
            }
            let err = await response.json();
            console.log(err);
            window.alert(err.error);
        } catch (e) {
            window.alert("Request failed: ", e);
        }
    }

    let preventWheel = (e) => {
        // Prevent the input value change
        e.target.blur();
        e.target.style.border = "2px solid black";

        // Refocus immediately, on the next tick (after the current function is done)
        setTimeout(() => {
            e.target.focus();
            e.target.style.border = "";
        }, 0)
    }

    return (
        <form onSubmit={listing._id ? editHandler : createHandler} className="flex flex-col items-center mx-auto py-4 px-6 gap-4 w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] relative">
                <div onClick={() => { setIsForm ? setIsForm(false) : navigate(-1) }} className="absolute right-1 top-2 sm:right-6 h-6 w-6 border-3 rounded-full cursor-pointer flex flex-col justify-center items-center">
                    <span className="absolute rotate-45 border-b-3 w-[0.8rem]"></span>
                    <span className="absolute -rotate-45 border-b-3 w-[0.8rem]"></span>
                </div>
            <div className="flex flex-col items-center">
                <span className="font-bold text-xl text-center">{listing.by || "Default User"}</span>
                <span className="font-semibold">{listing._id ? "Edit your Listing" : "Create your Listing"}</span>
            </div>
            <div className="flex flex-col items-center w-full">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" className="px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col items-center w-full h-max">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" rows={6} defaultValue={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="flex flex-col items-center w-full h-max">
                <label htmlFor="imgURL">Image URL</label>
                <input id="imgURL" name="image" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" type="text" value={imgURL} onChange={(e) => setImgURL(e.target.value)} />
            </div>
            <div className="flex flex-col items-center w-full h-max">
                <label htmlFor="amount">Amount(₹)</label>
                <input id="amount" name="price" onWheel={preventWheel} className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="flex flex-col items-center w-full h-max">
                <label htmlFor="location">Location</label>
                <input id="location" name="location" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="flex flex-col items-center w-full h-max">
                <label htmlFor="country">Country</label>
                <input id="country" name="country" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div className="mx-auto w-fit">
                <button id="create-btn" className="bg-[#fedf4b] px-2 mx-2 rounded hover:border-2 box-border h-8 w-16 cursor-pointer">Save</button>
                <button type="button" onClick={() => { setIsForm ? setIsForm(false) : navigate(-1) }} className="bg-zinc-200 px-2 mx-2 rounded hover:border-2 box-border h-8 w-20 cursor-pointer">Cancel</button>
            </div>
        </form>
    )
}

export default ListingForm;