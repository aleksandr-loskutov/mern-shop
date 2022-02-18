import React, { useContext, useEffect, useRef, useState } from "react";
import categoryService from "../services/category.service";
import { toast } from "react-toastify";
import Preloader from "../components/preloader";

const CategoriesContext = React.createContext();
export const useCategories = () => {
    return useContext(CategoriesContext);
};
export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const prevState = useRef();
    useEffect(() => {
        const getCategories = async () => {
            try {
                const { content } = await categoryService.fetchAll();
                setCategories(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getCategories();
    }, []);
    const getCategory = (id) => {
        return categories.find((q) => q._id === id);
    };
    const updateCategory = async ({ _id: id, ...data }) => {
        try {
            const { content } = await categoryService.update(id, data);
            setCategories((prevState) =>
                prevState.map((item) => {
                    if (item._id === content._id) {
                        return content;
                    }
                    return item;
                })
            );
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };
    const addCategory = async (data) => {
        try {
            const { content } = await categoryService.create(data);
            setCategories((prevState) => [...prevState, content]);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };
    const deleteCategory = async (id) => {
        //оптимистичное удаление
        prevState.current = categories;
        setCategories((prevState) =>
            prevState.filter((item) => item._id !== id)
        );
        try {
            await categoryService.delete(id);
        } catch (error) {
            toast.error("Объект не удален");
            errorCatcher(error);
            setCategories(prevState.current);
        }
    };
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    return (
        <CategoriesContext.Provider
            value={{
                categories,
                getCategory,
                updateCategory,
                addCategory,
                deleteCategory
            }}
        >
            {!isLoading ? children : <Preloader />}
        </CategoriesContext.Provider>
    );
};
