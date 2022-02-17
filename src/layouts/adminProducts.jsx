import React, { useState } from "react";
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
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };
    const searchedProducts = products
        ? searchQuery
            ? products.filter((product) => {
                  return (
                      product.name
                          .toString()
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1 ||
                      product.article.indexOf(searchQuery) !== -1
                  );
              })
            : products
        : [];
    return (
        <PageAdmin
            title={
                productId
                    ? edit
                        ? "Редактировать товар"
                        : "Информация о товаре"
                    : "Все товары"
            }
            search={!productId}
            onSearch={handleSearchQuery}
            searchQuery={searchQuery}
            searchTip="артикул / название..."
        >
            {productId ? (
                edit ? (
                    <AdminEditProduct product={product} />
                ) : (
                    <AdminViewProduct product={product} />
                )
            ) : (
                <AdminProductsTable products={searchedProducts} />
            )}
        </PageAdmin>
    );
};

export default AdminProducts;
