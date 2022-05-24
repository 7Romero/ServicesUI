import { createContext } from "react";

export type FilterType = {
    logicalOperator: number,
        filters: {
            comparisonOperators: number,
            path: string,
            value: string
        }[]
}

export type PaginateType = {
    pageIndex: number,
    pageSize: number,
    columnNameForSorting: string,
    sortDirection: "asc" | "desc",
    requestFilters?: FilterType,
    setPageIndex: (data: number) => void,
    setPageSize: (data: number) => void,
    setColumnNameForSorting: (data: string) => void,
    setSortDirection: (data: "asc" | "desc") => void,
    setRequestFilters: (data: FilterType) => void,
}

export const PaginateContext = createContext<PaginateType>({
    pageIndex: 0,
    pageSize: 3,
    columnNameForSorting: "id",
    sortDirection: "asc",
    setPageIndex: () => {},
    setPageSize: () => {},
    setColumnNameForSorting: () => {},
    setSortDirection: () => {},
    setRequestFilters: () => {},
});