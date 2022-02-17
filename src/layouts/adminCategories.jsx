import React, { useState } from "react";
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
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };
    const searchedCategories = categories
        ? searchQuery
            ? categories.filter((category) => {
                  return (
                      category.name
                          .toString()
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
                  );
              })
            : categories
        : [];
    return (
        <PageAdmin
            title={categoryId ? "Редактировать категорию" : "Все категории"}
            search={!categoryId}
            onSearch={handleSearchQuery}
            searchQuery={searchQuery}
            searchTip="название категории..."
        >
            {categoryId ? (
                <AdminEditCategory category={category} />
            ) : (
                <AdminCategoriesTable categories={searchedCategories} />
            )}
        </PageAdmin>
    );
};

export default AdminCategories;
