import React from "react";
import { useParams } from "react-router-dom";
import AdminEditProduct from "../components/adminEditProduct";
import AdminViewProduct from "../components/adminViewProduct";
import AdminProductsTable from "../components/adminProductsTable";
import PageAdmin from "../components/pageAdmin";
import { useSelector } from "react-redux";
import { getProductById, getProducts } from "../store/products";

const AdminProducts = () => {
    const params = useParams();
    const { productId, edit } = params;
    const product = useSelector(getProductById(productId));
    const products = useSelector(getProducts());
    return (
        <PageAdmin
            title={
                productId
                    ? edit
                        ? "Редактировать товар"
                        : "Информация о товаре"
                    : "Все товары"
            }
        >
            {productId ? (
                edit ? (
                    <AdminEditProduct product={product} />
                ) : (
                    <AdminViewProduct product={product} />
                )
            ) : (
                <AdminProductsTable products={products} />
            )}
        </PageAdmin>
    );
};

export default AdminProducts;
