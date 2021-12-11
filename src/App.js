import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routing/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CategoriesProvider } from "./hooks/useCategory";
import ReactDOM from "react-dom";
import { CartProvider } from "react-use-cart";
function App() {
    return (
        <BrowserRouter>
            <CategoriesProvider>
                <CartProvider>
                    <AppRouter />
                </CartProvider>
            </CategoriesProvider>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
