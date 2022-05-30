import React, {useMemo, useState} from "react";
import {PaginateContext, RequestFiltersType} from "../../contexts/PaginateContext";
import useAuth from "../../hooks/useAuth";

type Props = {
    children: JSX.Element;
}

function PaginateProvider(props: Props) {
    const auth = useAuth();

    const [pageIndex, setPageIndex] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(3);
    const [columnNameForSorting, setColumnNameForSorting] = useState<string>("id");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [requestFilters, setRequestFilters] = useState<RequestFiltersType>(
        {
            logicalOperator: 0,
            filters: [
                {
                    comparisonOperators: 2,
                    path: "FreelancerId",
                    value: "",
                }
            ]
        }
    );

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