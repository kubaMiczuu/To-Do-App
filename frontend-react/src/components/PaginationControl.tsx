interface paginationControlProps {
    page: number;
    setCurrentPage: (currentPage: number) => void;
    text: string;
}

const PaginationControl = ({page, setCurrentPage, text}: paginationControlProps) => {
    return (
        <button onClick={() => setCurrentPage(page)} className={`bg-sky-400 font-bold text-white hover:bg-sky-500 active:bg-sky-500 rounded-lg border py-2 px-4 cursor-pointer hover:scale-115 transition active:scale-95 active:duration-75 shadow-md`}>
            {text}
        </button>
    )
}

export default PaginationControl;