import React from "react";
import { useParams } from "react-router-dom";
import AdminEditProduct from "../components/adminEditProduct";
import AdminViewProduct from "../components/adminViewProduct";
import AdminProductsTable from "../components/adminProductsTable";
import PageAdmin from "../components/pageAdmin";

const AdminProducts = () => {
    const params = useParams();
    const { productId, edit } = params;
    const products = [
        {
            _id: "3634918a-477c-4c80-b1c4-a67b9b33dc00",
            name: "Cheese",
            price: 2000,
            code: 25612,
            category: "Refrigerated foods"
        },
        {
            _id: "3634918a-577c-4c80-b1c4-a67b9b33dc00",
            name: "Crisps",
            price: 3000,
            code: 251612,
            category: "the Snack isle"
        },
        {
            _id: "3634918a-677c-4c80-b1c4-a67b9b33dc00",
            name: "Pizza",
            price: 4000,
            code: 256312,
            category: "Refrigerated foods"
        },
        {
            _id: "3634918a-777c-4c80-b1c4-a67b9b33dc00",
            name: "Chocolate",
            price: 1000,
            code: 254612,
            category: "the Snack isle"
        },
        {
            _id: "3634918a-877c-4c80-b1c4-a67b9b33dc00",
            name: "Self-raising flour",
            price: 1000,
            code: 256512,
            category: "Home baking"
        },
        {
            _id: "3634928a-377c-4c80-b1c4-a67b9b33dc00",
            name: "Ground almonds",
            price: 30000,
            code: 25612,
            category: "Home baking"
        }
    ];
    const product = {
        _id: "3634918a-477c-4c80-b1c4-a67b9b33dc00",
        name: "Cheese",
        price: 2000,
        code: 25612,
        category: "Refrigerated foods"
    };
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
                    <AdminEditProduct />
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
