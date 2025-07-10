import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { LISTING_PREFIX_URL } from "../utils/constants";

const Listing = () => {
    const [listing, setListing] = useState(null);
    const [error, setError] = useState(null);

    const { id } = useParams();
    useEffect(() => {
        fetchListing();
    }, []);

    let fetchListing = async () => {
        try {
            let res = await fetch(LISTING_PREFIX_URL + id);
            console.log(res);
            if (!res.ok) {
                let err = await res.json();
                console.log("Fetch failed: ", err);
                setError(err);
                return;
            }
            let data = await res.json();
            console.log(data);
            setListing(data);
        } catch (e) {
            console.log(e);
        }
    }

    if(error) return <div>Oops, we can't find the page you are looking for.</div>
    return !listing ? <div>Fetching the listing...</div> : <div>{listing.title}</div>
}

export default Listing;