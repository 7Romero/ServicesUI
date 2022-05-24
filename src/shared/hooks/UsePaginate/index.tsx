import { useContext } from "react";
import {PaginateContext} from "../../contexts/PaginateContext";

function usePaginate() {
    return useContext(PaginateContext);
}

export default usePaginate;