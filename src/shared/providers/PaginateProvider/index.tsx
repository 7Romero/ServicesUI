import React, {useCallback, useEffect, useMemo, useState} from "react";
import {UserContextType} from "../../contexts/AuthContext";
import {FilterType, PaginateContext} from "../../contexts/PaginateContext";
import Cookies from "js-cookie";

type Props = {
    children: JSX.Element;
}

function PaginateProvider(props: Props) {
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(3);
    const [columnNameForSorting, setColumnNameForSorting] = useState<string>("id");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [requestFilters, setRequestFilters] = useState<FilterType | undefined>();

    const contextValue = useMemo(
        () => ({
            pageIndex,
            pageSize,
            columnNameForSorting,
            sortDirection,
            requestFilters,
            setPageIndex,
            setPageSize,
            setColumnNameForSorting,
            setSortDirection,
            setRequestFilters
        }),
        [pageIndex,
            pageSize,
            columnNameForSorting,
            sortDirection,
            requestFilters,
            setPageIndex,
            setPageSize,
            setColumnNameForSorting,
            setSortDirection,
            setRequestFilters]
    );

    return (
        <PaginateContext.Provider value={contextValue}>
            {props.children}
        </PaginateContext.Provider>
    );
}

export default PaginateProvider;