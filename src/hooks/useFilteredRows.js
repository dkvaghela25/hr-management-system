import { useEffect, useState } from "react"
import { escapeRegExp } from "../constants";

export const useFilteredRows = (initialData, initialFiltersValue, setRows) => {

    const [filters, setFilters] = useState(initialFiltersValue);
    const [filteredRequests, setFilteredRequests] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "minDays" || name === "maxDays") return setFilters(prev => ({ ...prev, days: { ...prev.days, [name]: value } }))
        if (name === "startDate" || name === "endDate") return setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, [name]: value } }))
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    useEffect(() => {

        const handler = setTimeout(() => {
            const { id, employeeName, dateRange: { startDate, endDate }, days: { minDays, maxDays }, leaveType, note, status } = filters;

            if (!id && !employeeName && !startDate && !endDate && !minDays && !maxDays && !leaveType && !note && !status) return setFilteredRequests(initialData);

            const employeeNameRegex = new RegExp(escapeRegExp(employeeName || ""), "i");
            const noteRegex = new RegExp(escapeRegExp(note || ""), "i");

            const newFilteredRequests = initialData.filter((currRequest) => {

                const matchesId = id ? currRequest.id == id : true;
                const matchesEmployeeName = employeeNameRegex.test(String(currRequest.employeeName ?? ""));
                const matchesNote = noteRegex.test(String(currRequest.note ?? ""));

                const matchesRange = (startDate && endDate)
                    ? (new Date(currRequest.from) > new Date(startDate)) && new Date(currRequest.to) < new Date(endDate)
                    : true

                const matchesMinDays = minDays ? currRequest.days >= minDays : true;
                const matchesMaxDays = maxDays ? currRequest.days <= maxDays : true;
                const matchesLeaveType = leaveType ? currRequest.leaveType === leaveType : true;
                const matchesStatus = status ? currRequest.status === status : true;

                return matchesId & matchesEmployeeName && matchesNote && matchesRange && matchesMinDays && matchesMaxDays && matchesLeaveType && matchesStatus;
            });

            setFilteredRequests(newFilteredRequests);
        }, 400);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);


    useEffect(() => {
        if (filteredRequests.length === 0) {
            setRows([]);
        }
    }, [filteredRequests]);


    const clearFilters = () => {
        setFilters(initialFiltersValue)
    }

    return { filters, filteredRequests, setFilteredRequests, clearFilters, handleChange }

}