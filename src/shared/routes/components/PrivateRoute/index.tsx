import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import React from "react";

type Props = {
    children: JSX.Element;
}

function PrivateRoute(props: Props) {
    const auth = useAuth();
    const location = useLocation();
    const url = new URLSearchParams();
    url.set("redirect", location.pathname + location.search);

    return auth.token ? (
        props.children
    ) : (
        <Navigate
            to={{
                pathname: "/login",
                search: url.toString(),
            }}
        />
    );
}

export default PrivateRoute;