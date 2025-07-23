import { Suspense, useState } from "react";
import { useLoaderData, Await, useNavigate } from "react-router-dom";
import ListingForm from "./ListingForm";
import { ALL_LISTINGS_URL } from "../utils/constants";

const Listing = () => {
    const [isForm, setIsForm] = useState(false);
    const { listing } = useLoaderData();
    const navigate = useNavigate();

    const deleteHandler = async () => {
        let listingData = await listing;
        try{
            let response = await fetch(`${ALL_LISTINGS_URL}/${listingData._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                navigate(-1);
                window.alert("Listing deleted successfully");
                return;
            }
            let err = await response.json();
            console.log(err);
            window.alert(err.error);
        } catch (e) {
            window.alert("Request failed: ", e);
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={listing}>
                {(listing) => {
                    return isForm ? <ListingForm listing={listing} setIsForm={setIsForm} /> : <div className="m-auto w-full grow flex flex-col md:flex-row rounded shadow-2xl cursor-default relative">
                        <img className={`md:w-[50%] aspect-[16/12] bg-zinc-300 object-cover object-center`} src={listing.image} alt={listing.title} />
                        <div className="md:w-[50%] px-6 py-4 h-full">
                            <div className="flex mb-2 gap-4">
                                <span className="font-bold text-xl">{listing.title}</span>
                                <button onClick={() => setIsForm(true)} className="rounded px-2 border-2 h-7 bg-zinc-100 hover:bg-zinc-200 cursor-pointer">Edit</button>
                                <button onClick={() => window.prompt("To confirm the deletion — type anything and press OK.\nTo cancel — press Cancel button") ? deleteHandler() : ""} className="rounded px-2 border-2 h-7 bg-zinc-100 hover:bg-red-300 cursor-pointer">Delete</button>
                            </div>
                            <p className="text-gray-700">{listing.description}</p>
                            <p className="text-gray-900 font-semibold">Price: ₹{listing.price.toLocaleString("en-IN")}</p>
                            <p className="text-gray-700">Location: {listing.location}</p>
                            <p className="text-gray-700">Country: {listing.country}</p>
                        </div>
                    </div>
                }}
            </Await>
        </Suspense>
    )
}

export default Listing;