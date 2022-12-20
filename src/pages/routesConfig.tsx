import React, { useEffect } from "react";
import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./vm-pay/private/home";
import Login from "./vm-pay/public/login";
import { stateStorage } from "../service/api/apiRoutes";

const RouterConfig = () => {


    const App = () => {
        const routes = useRoutes([
            { path: '*', caseSensitive: false, element: <PrivateRoute ><Home /></PrivateRoute> },
            // { path: '/*', caseSensitive: false, element: <PrivateRoute ><Home /></PrivateRoute> },
            // { path: '/vm-pay/private/home', caseSensitive: false, element: <PrivateRoute ><Home /></PrivateRoute> },
            { path: '/vm-pay/public/login', caseSensitive: false, element: <PublicRoute><Login /></PublicRoute> },
        ]);
        return routes;
    };

    const PublicRoute = ({ children, redirectPath = '/vm-pay/private/home' }: any) => {
        if (stateStorage.getToken()) {
            return <Navigate to={redirectPath} replace />;
        }
        return children;
    }


    const PrivateRoute = ({ children, redirectPath = '/vm-pay/public/login' }: any) => {
        if (!stateStorage.getToken()) {
            return <Navigate to={redirectPath} replace />;
        }
        return children;
    }


    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>);
}

export default RouterConfig;