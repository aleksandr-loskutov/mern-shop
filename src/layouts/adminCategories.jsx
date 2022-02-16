import React from "react";
import { useParams } from "react-router-dom";
import AdminCategoriesTable from "../components/adminCategoriesTable";
import PageAdmin from "../components/pageAdmin";
import AdminEditCategory from "../components/adminEditCategory";
import { useSelector } from "react-redux";
import { getCategories, getCategoryById } from "../store/categories";

const AdminCategories = () => {
    const params = useParams();
    const { categoryId, edit } = params;
    const category = useSelector(getCategoryById(categoryId));
    const categories = useSelector(getCategories());
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
