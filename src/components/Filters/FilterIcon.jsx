import { useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterPopUp from "./FilterPopUp";

// Inside your columns .map(), replace the filter icon section:
const FilterIcon = ({ index, col, displayId, handleToggle }) => {

    const iconRef = useRef(null);

    return (
        <div className="relative">
            <FaFilter
                ref={iconRef}
                onClick={() => handleToggle(index)}
                className="cursor-pointer"
            />
            {displayId === index && (
                <FilterPopUp
                    accessor={col.accessor}
                    value={col.filterInputValue}
                    handleChange={col.handleChange}
                    iconRef={iconRef}
                />
            )}
        </div>
    );
};

export default FilterIcon;