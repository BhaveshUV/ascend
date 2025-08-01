import { useState, useEffect } from "react";
import { ALL_LISTINGS_URL } from "../utils/constants";
import ListingCard from "./ListingCard";
import ListingForm from "./ListingForm";

const AllListings = () => {
    const [listings, setListings] = useState(null);
    const [isForm, setIsForm] = useState(false);

    useEffect(() => {
        fetchListings();
    }, []);

    let fetchListings = async () => {
        try {
            let res = await fetch(ALL_LISTINGS_URL);
            let data = await res.json();
            setListings(data);
        } catch (e) {
            console.log(e);
        }
    }

    return !listings ? <div>Fetching listings...</div> : isForm ? <ListingForm listing={{}} setIsForm={setIsForm} /> : (
        <>
            <div className="flex flex-wrap gap-4 items-end my-8 px-4">
                <span className="text-3xl font-bold">All Listings</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 px-4 pb-8">
                {
                    listings.map((listing) => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))
                }
            </div>
        </>
    )
}

export default AllListings