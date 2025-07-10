import { Link } from "react-router";

const ListingCard = ({ listing }) => {
    const { _id, title, price, location, country, image, by } = listing;

    return (
        <Link to={`/listings/${_id}`}>
            <div className="w-xs max-w-md 2xl:w-md grow rounded shadow-2xl bg-[#fedf4b10] cursor-pointer h-full relative">
                <img className="w-full h-64 object-cover bg-zinc-300 rounded-t" src={image} alt={title} />
                <div className="px-6 py-4">
                    <h2 className="font-bold text-xl mb-2">{title}</h2>
                    <p className="text-gray-900 font-semibold">Price: ₹{price.toLocaleString("en-IN")}</p>
                    <p className="text-gray-700">Location: {location}</p>
                    <p className="text-gray-700">Country: {country}</p>
                </div>
                <p className="text-gray-700 font-semibold opacity-0 px-6">{by}</p>
                <p className="text-gray-700 font-semibold absolute bottom-4 left-6">{by}</p>
            </div>
        </Link>
    );
}

export default ListingCard;