import React from "react";
import NavBar from "../components/navBar";
import Title from "../components/pageTitle";
import Breadcrumbs from "../components/breadcrumbs";
import Filters from "../components/filters";
import ProductList from "../components/productList";
import Footer from "../components/footer";
import Sort from "../components/sort";

const Category = ({ match }) => {
    return (
        <>
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

export default Category;
