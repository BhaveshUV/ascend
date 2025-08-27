import { Link } from "react-router-dom";
import { LISTING_IMG_BASE_URL } from "../utils/constants";

const ListingCard = ({ listing }) => {
    const { _id, title, price, location, country, image, by } = listing;

    return (
        <Link to={`/listings/${_id}`}>
            <div className="max-[360px]:w-[256px] max-[551px]:w-[300px] min-[551px]:w-sm min-[736px]:w-xs min-[950px]:w-sm min-[1088px]:w-xs min-[1260px]:w-md grow rounded shadow-2xl bg-[#fedf4b10] cursor-pointer h-full relative break-words">
                <img className="w-full h-64 object-cover bg-zinc-300 rounded-t" src={LISTING_IMG_BASE_URL + image} alt={title} />
                <div className="px-6 py-4">
                    <h2 className="font-bold text-xl mb-2">{title}</h2>
                    <p className="text-gray-900 font-semibold">Price: ₹{price.toLocaleString("en-IN")}</p>
                    <p className="text-gray-700">Location: {location}</p>
                    <p className="text-gray-700">Country: {country}</p>
                </div>
                <p className="text-gray-700 font-semibold opacity-0 px-6">{by.username}</p>
                <p className="text-gray-700 font-semibold absolute bottom-4 left-6">{by.username}</p>
                <div className="w-full h-full absolute top-0 hover:bg-white opacity-15"></div>
            </div>
        </Link>
    );
}

export default ListingCard;