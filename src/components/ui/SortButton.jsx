import { useEffect, useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

const SortButton = ({ sortBy, accessor }) => {

    const [sortingOrder, setSortingOrder] = useState(null);

    const handleToggle = () => {
        setSortingOrder(prev => {
            if (prev === null) return "Asc";
            return prev === "Asc" ? "Desc" : "Asc"
        })
    }

    useEffect(() => {
        if (sortingOrder === null) return;
        sortBy(accessor, sortingOrder)
    }, [sortingOrder])

    return (
        <>
            <BiSortAlt2 className="cursor-pointer" onClick={handleToggle} size={17} />
        </>
    );
};

export default SortButton;