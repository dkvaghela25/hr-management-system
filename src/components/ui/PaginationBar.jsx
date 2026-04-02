import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { availableRowsPerPage } from "../../constants";

const PaginationBar = ({ totalRows, setRows }) => {

    const [currPage, setCurrPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const pages = Math.ceil(totalRows.length / rowsPerPage);
    const currentPage = pages === 0 ? 1 : Math.min(currPage, pages);

    useEffect(() => {
        if (totalRows.length < rowsPerPage) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRowsPerPage(Math.ceil((totalRows.length + 1) / 5) * 5)
        }
    }, [totalRows, rowsPerPage]);

    const getPagesArr = () => {
        let arr = Array.from({ length: pages }, (_, index) => index + 1);
        if (pages <= 10) {
            return arr;
        } else {
            const starting = arr.slice(0, 3);
            const ending = arr.slice(arr.length - 3);
            const middle = ["..."];

            if (![...starting, ...ending].includes(currentPage)) {
                middle.push(currentPage - 1);
                middle.push(currentPage);
                middle.push(currentPage + 1);
                middle.push("...");
            }

            return [...starting, ...middle, ...ending];
        }
    };

    const pagesArr = getPagesArr();

    useEffect(() => {
        const sliceStart = (currentPage - 1) * rowsPerPage;
        setRows(totalRows.slice(sliceStart, sliceStart + rowsPerPage));
    }, [currentPage, totalRows, rowsPerPage]);

    const gotoPage = (pageNo) => {
        if (pageNo >= 1 && pageNo <= pages) setCurrPage(pageNo);
    };


    return (
        <div className="flex items-center justify-between w-full">
            <div className="grid grid-cols-2 items-center w-[20%]">
                <label className="text-sm text-slate-700" htmlFor="">Rows Per Page : </label>
                <select
                    className="border p-1 rounded-sm bg-white text-sm text-slate-700"
                    name="type"
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(+e.target.value);
                        setCurrPage(1);
                    }}
                >
                    {availableRowsPerPage.map(rows => (
                        <option key={rows} value={rows}>{rows}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center justify-center">
                <div className="inline-flex -space-x-px rounded-md text-sm shadow-sm bg-white border border-slate-200 overflow-hidden">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => gotoPage(currentPage - 1)}
                        className="relative inline-flex items-center px-3 py-2 text-(--primary-text) hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed border-r border-slate-200 transition-colors"
                    >
                        <MdArrowBackIos className="w-4 h-4" />
                    </button>

                    {pagesArr.map((pageNumber, index) => (
                        <button
                            key={`page-${pageNumber}-${index}`}
                            onClick={() => gotoPage(pageNumber)}
                            disabled={pageNumber === "..."}
                            className={`relative inline-flex items-center px-4 py-2 cursor-pointer font-semibold border-r border-slate-200 transition-all
                            ${pageNumber === "..."
                                    ? "cursor-default text-(--primary-text)"
                                    : currentPage === pageNumber
                                        ? "bg-indigo-500 text-white"
                                        : "text-sm text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        disabled={currentPage === pages}
                        onClick={() => gotoPage(currentPage + 1)}
                        className="relative inline-flex items-center px-3 py-2 text-(--primary-text) hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <MdArrowForwardIos className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationBar;
