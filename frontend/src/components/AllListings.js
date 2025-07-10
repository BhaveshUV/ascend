import { useState, useEffect } from "react";
import { ALL_LISTINGS_URL } from "../utils/constants";
import ListingCard from "./ListingCard";

const AllListings = () => {
    const [listings, setListings] = useState(null);

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

    return !listings ? <div>Fetching listings...</div> : (
        <>
            <h1 className="text-3xl font-bold my-8 px-4">All Listings</h1>
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