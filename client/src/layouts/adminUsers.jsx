import React, { useState } from "react";
import PageAdmin from "../components/pageAdmin";
import { useParams } from "react-router-dom";
import AdminEditUser from "../components/form/adminEditUser";
import AdminUsersTable from "../components/table/adminUsersTable";
import { useSelector } from "react-redux";
import { getUserById, getUsersList } from "../store/users";
import _ from "lodash";
import AdminViewUser from "../components/admin/adminViewUser";

const AdminUsers = () => {
    const { userId, edit } = useParams();
    const users = useSelector(getUsersList());
    const user = useSelector(getUserById(userId));
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };
    const searchedUsers = users
        ? searchQuery
            ? users.filter((user) => {
                  return (
                      user.email
                          .toString()
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1 ||
                      user.name.indexOf(searchQuery.toLowerCase()) !== -1 ||
                      user.lastName.indexOf(searchQuery.toLowerCase()) !== -1
                  );
              })
            : users
        : [];
    const sortedUsers =
        searchedUsers.length > 0
            ? _.orderBy(
                  searchedUsers,
                  (user) => new Date(user["createdAt"]),
                  "desc"
              )
            : [];
    return (
        <PageAdmin
            title={
                userId
                    ? edit
                        ? "Редактировать пользователя"
                        : "Информация о пользователе"
                    : "Все пользователи"
            }
            search={!userId}
            onSearch={handleSearchQuery}
            searchQuery={searchQuery}
            searchTip="почта или ФИО..."
        >
            {userId && user ? (
                edit ? (
                    <AdminEditUser user={user} />
                ) : (
                    <AdminViewUser user={user} />
                )
            ) : (
                <AdminUsersTable users={sortedUsers} />
            )}
        </PageAdmin>
    );
};

export default AdminUsers;
