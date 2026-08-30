import {getPaginationRange} from "../utils/getPaginationRange.ts";
import PaginationCard from "./PaginationCard.tsx";

interface paginationBarProps {
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    totalPages: number;
}

const PaginationBar = ({currentPage, setCurrentPage, totalPages}: paginationBarProps) => {

    const allPages = getPaginationRange(currentPage, totalPages);

    return (
        <>
            {allPages.map((page, index) => {
                if(typeof page === "string") {
                    return <span key={index} className={`self-center px-1 font-bold`}>. . .</span>
                }
                return (
                    <PaginationCard key={index} page={page} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                )
            })}
        </>
    )

}

export default PaginationBar;