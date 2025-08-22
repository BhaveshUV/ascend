import { ALL_LISTINGS_URL } from "../utils/constants";
import { FlashContext } from "../contexts/FlashContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Reviews = ({ listingData, setRefreshListing }) => {
    let listing = listingData;
    const { setFlashMessage } = useContext(FlashContext);
    const { currUser, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const printStar = (rating) => {
        switch (rating) {
            case 1: return "★☆☆☆☆";
            case 2: return "★★☆☆☆";
            case 3: return "★★★☆☆";
            case 4: return "★★★★☆";
            default: return "★★★★★"
        }
    };
    console.dir(listing.reviews);

    const deleteHandler = async (reviewId) => {
        try {
            const res = await fetch(`${ALL_LISTINGS_URL}/${listing._id}/reviews/${reviewId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.dir(res);
            if(!res.ok) {
                const err = await res.json();
                if(err.error === "You are not logged in") navigate("/login");
                setFlashMessage("error", `Error deleting the review: ${err.error}`);
                console.dir(err);
                return;
            }
            setFlashMessage("success", "Review deleted successfully");
            setRefreshListing(prev => !prev);
        } catch (e) {
            setFlashMessage("error", "Request failed: " + e);
            console.dir(e);
        }
    }

    return (
        <div className="m-auto py-4 w-full flex flex-col items-center cursor-default">
            <div className="w-full md:w-[70%] xl:w-[50%] px-6 flex flex-col gap-6">
                <span className="h-10 w-full"></span>
                <span className="font-bold text-xl text-center sticky bottom-2">REVIEWS</span>
                {
                    !listing.reviews.length ? <div className="text-zinc-500 text-center">No reviews yet</div> :
                        listing.reviews.map(ele => (
                            <div key={ele._id} className="bg-zinc-200 px-2 py-2 rounded">
                                <div className="text-gray-900 font-semibold">{ele.by}</div>
                                <div>{printStar(ele.rating)}</div>
                                <div className="text-gray-700">{ele.review}</div>
                                {!loading && currUser && <button onClick={() => window.prompt("To confirm the deletion — type anything and press OK.\nTo cancel — press Cancel button") ? deleteHandler(ele._id) : ""} className="mt-2 rounded px-2 border-2 border-black bg-zinc-200 hover:bg-black hover:text-white cursor-pointer">Delete</button>}
                            </div>
                        ))
                }
                <span className="h-10 w-full"></span>
            </div>
        </div>
    )
}

export default Reviews;