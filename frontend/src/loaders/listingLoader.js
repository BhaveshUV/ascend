import { defer } from "react-router-dom";
import { LISTING_PREFIX_URL } from "../utils/constants";

const listingLoader = async ({ params }) => {
    const res = await fetch(LISTING_PREFIX_URL + params.id);
    console.dir(res);
    if (!res.ok) {
        const err = await res.json();
        console.dir(err);
        throw new Response(err.error || "Listing not found", { status: res.status, statusText: res.statusText })
    }

    return defer({
        listing: res.json(),
    })
}

export default listingLoader;