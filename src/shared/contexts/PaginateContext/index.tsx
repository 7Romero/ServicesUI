import { createContext } from "react";

export type FilterType = {
    comparisonOperators: number,
    path: string,
    value: string
}

export type RequestFiltersType = {
    logicalOperator: number,
        filters: FilterType[]
}

export type PaginateType = {
    pageIndex: number,
    pageSize: number,
    columnNameForSorting: string,
    sortDirection: "asc" | "desc",
    requestFilters: RequestFiltersType,
    setPageIndex: (data: number) => void,
    setPageSize: (data: number) => void,
    setColumnNameForSorting: (data: string) => void,
    setSortDirection: (data: "asc" | "desc") => void,
    setRequestFilters: (data: RequestFiltersType) => void,
}

export const PaginateContext = createContext<PaginateType>({
    pageIndex: 0,
    pageSize: 3,
    columnNameForSorting: "id",
    sortDirection: "asc",
    requestFilters: {
        logicalOperator: 0,
        filters: [
            {
                comparisonOperators: 2,
                path: "FreelancerId",
                value: ""
            }
        ]
    },
    setPageIndex: () => {},
    setPageSize: () => {},
    setColumnNameForSorting: () => {},
    setSortDirection: () => {},
    setRequestFilters: () => {},
});