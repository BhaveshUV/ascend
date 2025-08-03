import { defer } from "react-router-dom";
import { ALL_LISTINGS_URL } from "../utils/constants";

const listingLoader = async ({ params }) => {
    const res = await fetch(ALL_LISTINGS_URL + "/" + params.id);
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