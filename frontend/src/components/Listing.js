import { useLoaderData, Await } from "react-router";
import { Suspense } from "react";

const Listing = () => {
    const { listing } = useLoaderData();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={listing}>
                {
                    (listing) => (
                        <div className="m-auto w-full grow flex flex-col md:flex-row rounded shadow-2xl cursor-default">
                            <img className={`md:w-[50%] aspect-[16/12] bg-zinc-300 rounded-t object-cover object-center`} src={listing.image} alt={listing.title} />
                            <div className="md:w-[50%] px-6 py-4 h-full">
                                <h2 className="font-bold text-xl mb-2">{listing.title}</h2>
                                <p className="text-gray-700">{listing.description}</p>
                                <p className="text-gray-900 font-semibold">Price: ₹{listing.price.toLocaleString("en-IN")}</p>
                                <p className="text-gray-700">Location: {listing.location}</p>
                                <p className="text-gray-700">Country: {listing.country}</p>
                            </div>
                        </div>
                    )
                }
            </Await>
        </Suspense>
    )
}

export default Listing;