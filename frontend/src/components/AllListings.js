import { useState, useEffect } from "react";
import { ALL_LISTINGS_URL } from "../utils/constants";
import Listing from "./Listing";

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
        <div className="mx-auto px-4 py-8 bg-zinc-100 bg-[url('https://cdn.pixabay.com/photo/2023/02/03/05/18/abstract-7764192_1280.jpg')] bg-fixed">
            <div className="mx-auto py-8 bg-zinc-100">
                <h1 className="text-3xl font-bold mb-8 px-4">All Listings</h1>
                <div className="flex flex-wrap justify-center gap-8 px-4">
                    {
                        listings.map((listing) => (
                            <Listing key={listing._id} listing={listing} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AllListings