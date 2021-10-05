import React, { useEffect } from "react";
import NavBar from "../components/navBar";
import Title from "../components/pageTitle";
import Breadcrumbs from "../components/breadcrumbs";
import Sort from "../components/sort";
import Filters from "../components/filters";
import ProductList from "../components/productList";
import Footer from "../components/footer";
import { useSelector, useDispatch } from "react-redux";
// import { sort } from "../store/actions/actions";
import { fetchCategories } from "../store/actions/categories";

const Category = ({ match, store }) => {
    const state = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);
    // <button onClick={() => dispatch(sort())}> TEST </button>
    return (
        <>
            {state.categories.map((cat) => (
                <ul key={cat._id}>
                    <li>{cat.name}</li>
                </ul>
            ))}

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
