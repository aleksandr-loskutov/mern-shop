import React from "react";
import { Link } from "react-router-dom";
import { Button, UncontrolledTooltip } from "reactstrap";
import TableComponent from "./table/table";

function AdminCategoriesTable({ categories }) {
    const columns = {
        name: {
            path: "name",
            name: "Название",
            component: (category) => <span>{category.name}</span>
        },

        photo: {
            path: "photo",
            name: "Изображение",
            component: (category) => <span>{category.photo}</span>
        },
        alias: {
            path: "alias",
            name: "Алиас",
            component: (category) => <span>{category.price}</span>
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
                        data-toggle="tooltip"
                        id="tooltip278266693"
                        size="sm"
                        type="button"
                        to={`${category.alias}/edit`}
                        tag={Link}
                    >
                        <i className="fa fa-edit" />
                    </Button>
                    <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip278266693"
                    >
                        Редактировать
                    </UncontrolledTooltip>
                </>
            )
        }
    };
    return <TableComponent columns={columns} data={categories} />;
}

export default AdminCategoriesTable;
