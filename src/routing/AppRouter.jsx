import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";
import { ROOT_ROUTE } from "../utils/consts";

const AppRouter = () => {
    const authed = true;
    return (
        <Switch>
            {authed &&
                authRoutes.map(({ path, component }) => (
                    <Route key={path} path={path} component={component} exact />
                ))}
            {publicRoutes.map(({ path, component }) => (
                <Route key={path} path={path} component={component} exact />
            ))}
            <Redirect to={ROOT_ROUTE} />
        </Switch>
    );
};

export default AppRouter;
