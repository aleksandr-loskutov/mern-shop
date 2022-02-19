import React from "react";
import { Router } from "react-router-dom";
import AppRouter from "./routing/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "react-use-cart";
import AppLoader from "./components/hoc/appLoader";
import history from "./utils/history";
function App() {
    return (
        <Router history={history}>
            <CartProvider>
                <AppLoader>
                    <AppRouter />
                </AppLoader>
            </CartProvider>
            <ToastContainer />
        </Router>
    );
}

export default App;
