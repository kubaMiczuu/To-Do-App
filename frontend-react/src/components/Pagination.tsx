import PaginationControl from "./PaginationControl.tsx";
import PaginationBar from "./PaginationBar.tsx";

interface paginationProps {
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    totalPages: number;
}

const Pagination = ({currentPage, setCurrentPage, totalPages}: paginationProps) => {
    return (
        <div className="flex flex-row gap-3 justify-center">
            {currentPage > 0 && (
                <PaginationControl page={currentPage-1} setCurrentPage={setCurrentPage} text={"Previous"}></PaginationControl>
            )}

            <PaginationBar totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}></PaginationBar>

            {currentPage < totalPages-1 && totalPages > 1 && (
                <PaginationControl page={currentPage+1} setCurrentPage={setCurrentPage} text={"Next"}></PaginationControl>
            )}

        </div>
    )
}

export default Pagination;