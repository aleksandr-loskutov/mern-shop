import React from "react";
import { Switch, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
// Redirect
const AppRouter = () => {
    const authed = false;
    return (
        <Switch>
            {authed &&
                authRoutes.map(({ path, component }) => (
                    <Route key={path} path={path} component={component} exact />
                ))}
            {publicRoutes.map(({ path, component }) => (
                <Route key={path} path={path} component={component} exact />
            ))}
        </Switch>
    );
};

export default AppRouter;
