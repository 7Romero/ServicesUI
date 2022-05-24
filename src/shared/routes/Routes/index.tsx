import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {
    CircularProgress,
    Container,
    Grid,
} from "@mui/material";
import GuestRoute from "../components/GuestRoute";
import PrivateRoute from "../components/PrivateRoute"
import NotFound from "../../../pages/NotFound";
import Login from "../../../pages/Login"
import Registration from "../../../pages/Registration"
import Home from "../../../pages/Home";
import FindWork from "../../../pages/FindWork";
import CreateOrder from "../../../pages/CreateOrder";
import Users from "../../../pages/Users";
import Orders from "../../../pages/Orders";
import PaginateProvider from "../../providers/PaginateProvider";
import EditProfile from "../../../pages/EditProfile";
import EditOrder from "../../../pages/EditOrder";

function AppRoutes() {
    const auth = useAuth();

    return auth.isLoaded ? (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route
                path="/FindWork"
                element={
                    <PaginateProvider>
                        <FindWork />
                    </PaginateProvider>
                }
            />
            <Route
                path="/Orders/:id"
                element={
                    <PrivateRoute>
                        <Orders />
                    </PrivateRoute>
                }
            />
            <Route
                path="/CreateOrder"
                element={
                    <PrivateRoute>
                        <CreateOrder />
                    </PrivateRoute>
                }
            />
            <Route
                path="/EditOrder/:id"
                element={
                    <PrivateRoute>
                        <EditOrder />
                    </PrivateRoute>
                }
            />
            <Route
                path="/Users/:userName"
                element={
                    <PrivateRoute>
                        <Users />
                    </PrivateRoute>
                }
            />
            <Route
                path="/EditProfile"
                element={
                    <PrivateRoute>
                        <EditProfile />
                    </PrivateRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                }
            />
            <Route
                path="/registration"
                element={
                    <GuestRoute>
                        <Registration />
                    </GuestRoute>
                }
            />

            <Route path="/not-found-404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found-404" />} />
        </Routes>
    ) : (
        <Container maxWidth="md" sx={{p: 3}}>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item>
                    <CircularProgress color="inherit" />
                </Grid>
            </Grid>
        </Container>
    );
}

export default AppRoutes;