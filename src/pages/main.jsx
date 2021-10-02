import React from "react";
import NavBar from "../components/navBar";
import Title from "../components/pageTitle";
import Breadcrumbs from "../components/breadcrumbs";
import Sort from "../components/sort";
import CategoryList from "../components/categoryList";
import ProductList from "../components/productList";
import Footer from "../components/footer";

const Main = () => {
    return (
        <>
            <NavBar />
            <main className="main">
                <Title title={"Главная"}>
                    <Breadcrumbs />
                </Title>
                <Sort />
                <div className="catalog-max-container">
                    <div className="catalog-inner-container">
                        <CategoryList />
                        <ProductList />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Main;
