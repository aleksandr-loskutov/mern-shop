import React from "react";
import { Link } from "react-router-dom";
import { Button, UncontrolledTooltip } from "reactstrap";
import TableComponent from "./table/table";

function AdminCategoriesTable({ categories }) {
    const columns = {
        photo: {
            path: "photo",
            name: "Фото",
            component: (category) => <img width="70" src={category.img}></img>
        },
        name: {
            path: "name",
            name: "Название",
            component: (category) => <span>{category.name}</span>
        },
        metaTitle: {
            path: "metaTitle",
            name: "Мета заголовок",
            component: (category) => <span>{category.metaTitle}</span>
        },
        status: {
            path: "status",
            name: "Статус",
            component: (category) => (
                <span>
                    {category.status ? (
                        <i className="fa fa-check" />
                    ) : (
                        <i className="fa fa-times" aria-hidden="true" />
                    )}
                </span>
            )
        },

        action: {
            path: "action",
            name: "Действия",
            component: (category) => (
                <>
                    <Button
                        className="btn-link mr-1"
                        color="success"
                        size="sm"
                        type="button"
                        to={`/admin/categories/${category._id}/edit`}
                        tag={Link}
                    >
                        <i className="fa fa-edit" />
                    </Button>
                </>
            )
        }
    };
    return <TableComponent columns={columns} data={categories} />;
}

export default AdminCategoriesTable;
