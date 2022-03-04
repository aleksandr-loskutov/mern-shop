import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageAdmin from "../components/pageAdmin";
import { useSelector } from "react-redux";
import { getCategories, getCategoryById } from "../store/categories";
import _ from "lodash";
import AdminEditCategory from "../components/admin/adminEditCategory";
import AdminCategoriesTable from "../components/admin/adminCategoriesTable";

const AdminCategories = () => {
    const params = useParams();
    const { categoryId } = params;
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
    const sortedCategories =
        searchedCategories.length > 0
            ? _.orderBy(
                  searchedCategories,
                  (category) => new Date(category["updatedAt"]),
                  "desc"
              )
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
                <AdminCategoriesTable categories={sortedCategories} />
            )}
        </PageAdmin>
    );
};

export default AdminCategories;
