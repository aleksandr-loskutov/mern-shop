import React from "react";
import UserSettings from "../../pages/User/userSettings";

const AdminEditUser = ({ user }) => {
    return <UserSettings specifiedUser={user} />;
};

export default AdminEditUser;
