import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListingForm from "./ListingForm";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import { ALL_LISTINGS_URL } from "../utils/constants";
import { FlashContext } from "../contexts/FlashContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";

const Listing = () => {
    const [isForm, setIsForm] = useState(false);
    const [listing, setListing] = useState(null);
    const [refreshListing, setRefreshListing] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const { setFlashMessage } = useContext(FlashContext);
    const { currUser, loading } = useContext(AuthContext);

    const deleteHandler = async () => {
        try {
            let response = await fetch(`${ALL_LISTINGS_URL}/${listing._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                navigate(-1);
                setFlashMessage("success", "Listing deleted successfully");
                return;
            }
            let err = await response.json();
            console.log(err);
            if (err.error === "You are not logged in") navigate("/login");
            setFlashMessage("error", err.error || "Error deleting the listing");
        } catch (e) {
            setFlashMessage("error", "Request failed: " + e);
        }
    };

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch(ALL_LISTINGS_URL + "/" + params.id);
                if (!res.ok) {
                    const err = await res.json();
                    console.dir(err);
                    setFlashMessage("error", err.error || "Listing not found");
                    return;
                }
                const data = await res.json();
                setListing(data);
                console.dir(data);
            } catch (e) {
                console.dir(e);
                setFlashMessage("error", "Request failed: " + e);
            }
        }

        fetchListing();
    }, [params.id, refreshListing])

    return (
        !listing ? <div>Loading...</div> :
            isForm ? <ListingForm listingData={listing} setRefreshListing={setRefreshListing} setIsForm={setIsForm} /> : <>
                <div className="m-auto w-full grow flex flex-col md:flex-row cursor-default relative md:min-h-[70vh] break-words">
                    <img className={`md:w-[50%] aspect-[16/12] bg-zinc-300 object-cover object-center`} src={listing.image} alt={listing.title} />
                    <div className="md:w-[50%] px-6 py-4 h-full flex flex-col gap-4">
                        <div>
                            <div className="mb-2">
                                <span className="font-bold text-xl pr-2">{listing.title}</span>
                                <div className="inline-flex gap-2">
                                    {
                                        !loading && currUser &&
                                        <>
                                            <button onClick={() => setIsForm(true)} className="rounded px-2 border-2 h-7 bg-zinc-100 hover:bg-zinc-200 cursor-pointer">Edit</button>
                                            <button onClick={() => window.prompt("To confirm the deletion — type anything and press OK.\nTo cancel — press Cancel button") ? deleteHandler() : ""} className="rounded px-2 border-2 h-7 bg-zinc-100 hover:bg-red-300 cursor-pointer">Delete</button>
                                        </>
                                    }
                                </div>
                            </div>
                            <p className="text-gray-700">{listing.description}</p>
                            <p className="text-gray-900 font-semibold">Price: ₹{listing.price.toLocaleString("en-IN")}</p>
                            <p className="text-gray-700">Location: {listing.location}</p>
                            <p className="text-gray-700">Country: {listing.country}</p>
                        </div>
                    </div>
                </div>
                <ReviewForm setRefreshListing={setRefreshListing} />
                <Reviews listingData={listing} setRefreshListing={setRefreshListing} />
            </>
    )
}

export default Listing;