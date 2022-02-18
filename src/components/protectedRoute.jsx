import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentUserRole, getIsLoggedIn } from "../store/users";
const ProtectedRoute = ({
    component: Component,
    children,
    requiredRole,
    ...rest
}) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userRole = useSelector(getCurrentUserRole());
    const isRoleMatch =
        requiredRole && requiredRole !== ""
            ? userRole === "admin"
                ? true
                : requiredRole === userRole
            : true;
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn || !isRoleMatch) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                } else {
                    return Component ? <Component {...props} /> : children;
                }
            }}
        />
    );
};
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
