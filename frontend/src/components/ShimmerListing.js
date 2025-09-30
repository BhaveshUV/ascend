const ShimmerListing = () => {
    return (
        <div className="m-auto w-full grow flex flex-col md:flex-row cursor-default relative md:min-h-[70vh] break-words">
            <div className={`md:w-[50%] aspect-[16/12] bg-zinc-300 object-cover object-center`} />
            <div className="md:w-[50%] px-6 py-4 h-full flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <div className="sm:mb-2">
                        <span className="font-bold text-xl text-zinc-300 bg-zinc-300 pr-2">A random listing-title</span>
                    </div>
                    <span className="text-zinc-300 bg-zinc-300 font-semibold w-fit">Uploaded by username</span>
                    <p className="text-zinc-300 bg-zinc-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p className="text-zinc-300 bg-zinc-300 font-semibold w-fit">Price: ₹100</p>
                    <p className="text-zinc-300 bg-zinc-300">Location: </p>
                    <p className="text-zinc-300 bg-zinc-300 w-fit">Country: </p>
                </div>
            </div>
        </div>
    )
};

export default ShimmerListing;