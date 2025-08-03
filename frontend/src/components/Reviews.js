

const Reviews = () => {
    const printStar = (rating) => {
        switch(rating) {
            case 1: return "★☆☆☆☆";
            case 2: return "★★☆☆☆";
            case 3: return "★★★☆☆";
            case 4: return "★★★★☆";
            default: return "★★★★★"
        }
    };

    return (
        <div className="m-auto py-4 w-full flex flex-col items-center cursor-default">
            <div className="w-full md:w-[50%] px-6 flex flex-col gap-6">
                <span className="h-10 w-full"></span>
                <span className="font-bold text-xl text-center sticky bottom-2">REVIEWS</span>
                <div>
                    <div className="bg-zinc-200 px-2 py-2 rounded">
                        <div className="text-gray-900 font-semibold">Default-user</div>
                        <div>{printStar(4)}</div>
                        <div className="text-gray-700">This is a review</div>
                    </div>
                </div>
                <span className="h-10 w-full"></span>
            </div>
        </div>
    )
}

export default Reviews;