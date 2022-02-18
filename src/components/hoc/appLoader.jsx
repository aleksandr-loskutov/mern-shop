import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsLoggedIn,
    loadUsersList,
    getUsersLoadingStatus
} from "../../store/users";
import { loadOrdersList, getOrdersLoadingStatus } from "../../store/orders";
import PropTypes from "prop-types";
import {
    loadCategoriesList,
    getCategoriesLoadingStatus
} from "../../store/categories";
import {
    loadProductsList,
    getProductsLoadingStatus
} from "../../store/products";
import Preloader from "../preloader";
function AppLoader({ children }) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isCategoriesLoading = useSelector(getCategoriesLoadingStatus());
    const isProductsLoading = useSelector(getProductsLoadingStatus());
    const isOrdersLoading = useSelector(getOrdersLoadingStatus());
    const isUsersLoading = useSelector(getUsersLoadingStatus());
    const isLoaded = !isCategoriesLoading && !isProductsLoading;
    const authDataLoaded = !isOrdersLoading && !isUsersLoading;
    useEffect(() => {
        dispatch(loadCategoriesList());
        dispatch(loadProductsList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
            dispatch(loadOrdersList());
        }
    }, [dispatch, isLoggedIn]);
    if (!isLoaded || !authDataLoaded) return <Preloader />;
    return children;
}
AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AppLoader;
