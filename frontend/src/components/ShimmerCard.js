const ShimmmerCard = () => {
    return (
        <div className="max-[360px]:w-[256px] max-[551px]:w-[300px] min-[551px]:w-sm min-[736px]:w-xs min-[950px]:w-sm min-[1088px]:w-xs min-[1260px]:w-md rounded shadow-2xl bg-[#fedf4b10] cursor-pointer h-full relative break-words">
            <div className="w-full h-64 object-cover bg-zinc-300 rounded-t"></div>
            <div className="px-6 py-4">
                <h2 className="text-xl text-zinc-300 mb-2 bg-zinc-300">Random</h2>
                <p className="text-zinc-300 font-semibold bg-zinc-300 w-2/3 mb-1">Random</p>
                <p className="text-zinc-300 bg-zinc-300 w-1/4 mb-1">Random</p>
                <p className="text-zinc-300 bg-zinc-300 w-1/4 mb-1">Random</p>
                <p className="text-zinc-300 font-semibold bg-zinc-300 w-1/3">Random</p>
            </div>
        </div>
    )
};

export default ShimmmerCard;