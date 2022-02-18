import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";
import { ROOT_ROUTE } from "../utils/consts";
import ProtectedRoute from "../components/protectedRoute";

const AppRouter = () => {
    return (
        <Switch>
            {authRoutes.map(({ path, component, role }) => (
                <ProtectedRoute
                    key={path}
                    path={path}
                    requiredRole={role}
                    component={component}
                    exact
                />
            ))}
            {publicRoutes.map(({ path, component }) => (
                <Route key={path} path={path} component={component} exact />
            ))}
            <Redirect to={ROOT_ROUTE} />
        </Switch>
    );
};

export default AppRouter;
