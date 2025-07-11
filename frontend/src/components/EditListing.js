import { useState } from "react";

const EditListing = ({ listing, setIsForm }) => {
    const [title, setTitle] = useState(listing.title);
    const [imgURL, setImgURL] = useState(listing.image);
    const [amount, setAmount] = useState(listing.price);
    const [location, setLocation] = useState(listing.location);
    const [country, setCountry] = useState(listing.country);

    return (
        <form className="flex flex-col items-center mx-auto py-4 px-6 gap-4 w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
            <div className="flex flex-col items-center">
                <span className="font-bold text-xl text-center">{listing.by}</span>
                <span className="font-semibold">Edit your Listing</span>
            </div>
            <div className="flex flex-col items-center w-full">
                <label htmlFor="title">Title</label>
                <input id="title" className="px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col items-center w-full h-max">
                <label htmlFor="description">Description</label>
                <textarea id="description" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" rows={6} defaultValue={listing.description}></textarea>
            </div>
            <div className="flex flex-col items-center w-full h-max">
                <label htmlFor="imgURL">Image URL</label>
                <input id="imgURL" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" type="text" value={imgURL} onChange={(e) => setImgURL(e.target.value)} />
            </div>
            <div className="flex flex-col items-center w-full h-max">
                <label htmlFor="amount">Amount(₹)</label>
                <input id="amount" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="flex flex-col items-center w-full h-max">
                <label htmlFor="location">Location</label>
                <input id="location" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="flex flex-col items-center w-full h-max">
                <label htmlFor="country">Country</label>
                <input id="country" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div className="mx-auto w-fit">
                <button className="bg-[#fedf4b] px-2 mx-2 rounded hover:border-2 box-border h-8 w-16 cursor-pointer">Save</button>
                <button type="button" onClick={() => setIsForm(false)} className="bg-zinc-200 px-2 mx-2 rounded hover:border-2 box-border h-8 w-20 cursor-pointer">Cancel</button>
            </div>
        </form>
    )
}

export default EditListing;