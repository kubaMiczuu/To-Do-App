interface paginationCardProps {
    setCurrentPage: (currentPage: number) => void;
    page: number;
    currentPage: number;
}

const PaginationCard = ({setCurrentPage, page, currentPage}:paginationCardProps) => {
    const isActive = currentPage === page;

    return (
        <button onClick={() => setCurrentPage(page)} className={` ${isActive ? "bg-sky-400 font-bold text-white hover:bg-sky-500 active:bg-sky-500" : "bg-white text-slate-800"} rounded-lg border border-slate-200 py-2 px-4 cursor-pointer hover:scale-115 transition active:scale-95 active:duration-75 shadow-md`}>
            {page+1}
        </button>
    )
}

export default PaginationCard;