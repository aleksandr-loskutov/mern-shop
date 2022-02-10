import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routing/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "react-use-cart";
import AppLoader from "./components/hoc/appLoader";
function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <AppLoader>
                    <AppRouter />
                </AppLoader>
            </CartProvider>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
