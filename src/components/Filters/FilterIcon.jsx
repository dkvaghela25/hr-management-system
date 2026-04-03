import { useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterPopUp from "./FilterPopUp";

const FilterIcon = ({ index, col, displayId, handleToggle, rows }) => {

    const iconRef = useRef(null);

    return (
        <div className="relative">
            <FaFilter
                ref={iconRef}
                onClick={() => handleToggle(index)}
                className="cursor-pointer"
            />
            {displayId === index && (
                <div>
                    <FilterPopUp
                        rows={rows}
                        accessor={col.accessor}
                        value={col.filterInputValue}
                        handleChange={col.handleChange}
                        iconRef={iconRef}
                    />
                </div>
            )}
        </div>
    );
};

export default FilterIcon;