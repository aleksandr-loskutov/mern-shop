import React from "react";
import { useParams } from "react-router-dom";

import AdminCategoriesTable from "../components/adminCategoriesTable";
import PageAdmin from "../components/pageAdmin";
import AdminEditCategory from "../components/adminEditCategory";

const AdminCategories = () => {
    const params = useParams();
    const { categoryId } = params;
    const categories = [
        {
            _id: "3634918a-477c-4c80-b1c4-a67b9b33dc00",

            name: "Однокамерные",
            photo: "url",
            alias: "dvuhkamenie",
            products: 222,
            status: true
        },
        {
            _id: "3634918a-577c-4c80-b1c4-a67b9b33dc00",

            name: "Двухкамерные",
            photo: "url",
            alias: "dvuhkamenie",
            products: 222,
            status: true
        },
        {
            _id: "3634918a-677c-4c80-b1c4-a67b9b33dc00",

            name: "Трехкамерные",
            photo: "url",
            alias: "dvuhkamenie",
            products: 222,
            status: true
        }
    ];
    const category = {
        _id: "3634918a-677c-4c80-b1c4-a67b9b33dc00",
        name: "Трехкамерные",
        photo: "url",
        alias: "dvuhkamenie",
        products: 222,
        status: true
    };
    return (
        <PageAdmin
            title={categoryId ? "Редактировать категорию" : "Все категории"}
        >
            {categoryId ? (
                <AdminEditCategory category={category} />
            ) : (
                <AdminCategoriesTable categories={categories} />
            )}
        </PageAdmin>
    );
};

export default AdminCategories;
