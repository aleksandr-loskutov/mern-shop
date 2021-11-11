import React from "react";
import PageAdmin from "../components/pageAdmin";
import { useParams } from "react-router-dom";
import AdminEditUser from "../components/form/adminEditUser";
import AdminUsersTable from "../components/table/adminUsersTable";
import AdminViewUser from "../components/adminViewUser";

const AdminUsers = () => {
    const { userId, edit } = useParams();
    const users = [
        {
            n: "1",
            id: "518d816a-2b76-478a-955f-84f2116343aa",
            name: "Chandrea Leos",
            address: "Arkansas Street 9506, Faridkot, Libya, 397932",
            birthDate: "06.06.2020",
            email: "montavious_valasquezui@commissioners.wbo"
        },
        {
            n: "2",
            id: "89da96c3-27c2-4b89-b5d2-5021071c0610",
            name: "Jimy Huizar",
            address: "Grand St 3183, West Fargo, Croatia, 562953",
            birthDate: "22.07.2012",
            email: "adamm_broyleshmx@acquired.vp"
        },
        {
            n: "3",
            id: "e6a63062-2fa2-4cdc-92e9-e4f47babeb7b",
            name: "Kaili Saylors",
            address: "Biodiversity Road 2131, El Segundo, Malaysia, 563962",
            birthDate: "17.05.2019",
            email: "delma_olivogyjo@setting.hd"
        }
    ];
    const user = {
        n: "1",
        id: "518d816a-2b76-478a-955f-84f2116343aa",
        name: "Chandrea Leos",
        address: "Arkansas Street 9506, Faridkot, Libya, 397932",
        birthDate: "06.06.2020",
        email: "montaviou@commissioners.wbo",
        phone: "131231231",
        zip: "12312312",
        city: "Moscow"
    };
    return (
        <PageAdmin
            title={
                userId
                    ? edit
                        ? "Редактировать пользователя"
                        : "Информация о пользователе"
                    : "Все пользователи"
            }
        >
            {userId ? (
                edit ? (
                    <AdminEditUser user={user} />
                ) : (
                    <AdminViewUser user={user} />
                )
            ) : (
                <AdminUsersTable users={users} />
            )}
        </PageAdmin>
    );
};

export default AdminUsers;
