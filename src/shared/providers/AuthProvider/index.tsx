import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {AuthContext, UserContextType} from "../../contexts/AuthContext";
import api from "../../api";

type Props = {
    children: JSX.Element;
}

function AuthProvider(props: Props) {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [token, setTokenData] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<UserContextType | undefined>(undefined);

    const setToken = useCallback((tokenData: string | undefined) => {
        setTokenData(tokenData);

        if (tokenData) {
            Cookies.set("auth-token", tokenData);
        } else {
            Cookies.remove("auth-token");
        }
    }, []);
 
    const logOut = useCallback(() => {
        setUser(undefined);
        setToken(undefined);
    }, [setToken]);

    const loadData = useCallback(async () => {
        const tokenData = Cookies.get("auth-token");
        setTokenData(tokenData);

        try {
            if (tokenData) {
                const { data } = await api.auth.getProfile();
                setUser(data);
            }
        } catch {
            setToken(undefined);
        } finally {
            setIsLoaded(true);
        }
    }, [setToken, token]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const contextValue = useMemo(
        () => ({
            isLoaded,
            token,
            user,
            setUser,
            setToken,
            logOut,
        }),
        [isLoaded, user, token, setToken, logOut]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;