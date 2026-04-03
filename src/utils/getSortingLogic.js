const normalizeString = (value) => String(value ?? "").toLowerCase();

const normalizeNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : Number.NEGATIVE_INFINITY;
};

const normalizeDate = (value) => {
    const parsed = new Date(value).getTime();
    return Number.isFinite(parsed) ? parsed : Number.NEGATIVE_INFINITY;
};

const getCompareValue = (row, accessor) => {
    const value = row[accessor];

    switch (accessor) {
        case "id":
        case "days":
            return normalizeNumber(value);
        case "from":
            return normalizeDate(value);
        default:
            return normalizeString(value);
    }

};


export const getSortingLogic = (setRows) => {

    return (accessor, sortingOrder) => {
        if (!sortingOrder) return;

        setRows((prevRows) => {
            const sortedData = [...prevRows].sort((a, b) => {
                const first = getCompareValue(a, accessor);
                const second = getCompareValue(b, accessor);

                if (first < second) return sortingOrder === "Asc" ? -1 : 1;
                if (first > second) return sortingOrder === "Asc" ? 1 : -1;
                return 0;
            });

            return sortedData;
        });
    };

};