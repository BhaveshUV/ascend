import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ALL_LISTINGS_URL } from "../utils/constants";

const EditListing = ({ listing, setIsForm }) => {
    const [title, setTitle] = useState(listing.title);
    const [description, setDescription] = useState(listing.description);
    const [imgURL, setImgURL] = useState(listing.image);
    const [amount, setAmount] = useState(listing.price);
    const [location, setLocation] = useState(listing.location);
    const [country, setCountry] = useState(listing.country);

    const navigate = useNavigate();

    let submitHandler = async (e) => {
        e.preventDefault();
        let updatedForm = { title, description, imgURL, price: amount, location, country };
        console.dir(updatedForm);
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
                console.error("Error updating the listing: ", error);
            }
        } catch (e) {
            console.error("Request failed: ", e);
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
        <form method="POST" onSubmit={submitHandler} className="flex flex-col items-center mx-auto py-4 px-6 gap-4 w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
            <div className="flex flex-col items-center">
                <span className="font-bold text-xl text-center">{listing.by}</span>
                <span className="font-semibold">Edit your Listing</span>
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
                <button className="bg-[#fedf4b] px-2 mx-2 rounded hover:border-2 box-border h-8 w-16 cursor-pointer">Save</button>
                <button type="button" onClick={() => setIsForm(false)} className="bg-zinc-200 px-2 mx-2 rounded hover:border-2 box-border h-8 w-20 cursor-pointer">Cancel</button>
            </div>
        </form>
    )
}

export default EditListing;