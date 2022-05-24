import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import React from "react";

type Props = {
    children: JSX.Element;
}

function GuestRoute(props: Props) {
    const auth = useAuth();
    const location = useLocation();
    const url = new URLSearchParams(location.search.slice(1));

    return auth.token ? <Navigate to={url.get("redirect") || "/"} /> : props.children;
}

export default GuestRoute;