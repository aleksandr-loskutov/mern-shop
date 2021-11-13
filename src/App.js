import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routing/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CategoriesProvider } from "./hooks/useCategory";
function App() {
    return (
        <BrowserRouter>
            <CategoriesProvider>
                <AppRouter />
            </CategoriesProvider>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
