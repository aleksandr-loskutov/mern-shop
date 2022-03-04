import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageAdmin from "../components/pageAdmin";
import { useSelector } from "react-redux";
import { getProductById, getProducts } from "../store/products";
import _ from "lodash";
import AdminEditProduct from "../components/admin/adminEditProduct";
import AdminViewProduct from "../components/admin/adminViewProduct";
import AdminProductsTable from "../components/admin/adminProductsTable";

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
    const sortedProducts =
        searchedProducts.length > 0
            ? _.orderBy(
                  searchedProducts,
                  (product) => new Date(product["updatedAt"]),
                  "desc"
              )
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
                <AdminProductsTable products={sortedProducts} />
            )}
        </PageAdmin>
    );
};

export default AdminProducts;
