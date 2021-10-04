import React from "react";
import NavBar from "../components/navBar";
import Title from "../components/pageTitle";
import Breadcrumbs from "../components/breadcrumbs";
import Sort from "../components/sort";
import Filters from "../components/filters";
import ProductList from "../components/productList";
import Footer from "../components/footer";
import { useSelector, useDispatch } from "react-redux";

const Category = ({ match }) => {
    const state = useSelector((state) => state.categories);
    const dispatch = useDispatch();
    console.log("state", state);

    return (
        <>
            <button onClick={() => dispatch({ type: "TEST" })}> TEST </button>
            <NavBar />
            <main className="main">
                <Title title={match.params.alias}>
                    <Breadcrumbs />
                </Title>
                <Sort />
                <div className="catalog-max-container">
                    <div className="catalog-inner-container">
                        <Filters />
                        <ProductList />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};
// function mapStateToProps(state) {
//     return {
//         categories: state.categories
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return { fetchCategories: () => dispatch(fetchCategories()) };
// }
export default Category;
