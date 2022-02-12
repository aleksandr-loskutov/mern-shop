import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, loadUsersList } from "../../store/users";
import { loadOrdersList } from "../../store/orders";
import PropTypes from "prop-types";
import {
    loadCategoriesList,
    getCategoriesLoadingStatus
} from "../../store/categories";
import {
    loadProductsList,
    getProductsLoadingStatus
} from "../../store/products";
function AppLoader({ children }) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isCategoriesLoading = useSelector(getCategoriesLoadingStatus());
    const isProductsLoading = useSelector(getProductsLoadingStatus());
    const isLoaded = !isCategoriesLoading && !isProductsLoading;
    useEffect(() => {
        dispatch(loadCategoriesList());
        dispatch(loadProductsList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
            dispatch(loadOrdersList());
        }
    }, [dispatch, isLoggedIn]);
    if (!isLoaded) return "Loading...";
    return children;
}
AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AppLoader;
