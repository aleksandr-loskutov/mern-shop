import React from "react";

const Breadcrumbs = () => {
    return (
        <div className="breadcrumbs">
            <ul className="breadcrumbs-list">
                <li className="breadcrumbs-list-elements">
                    <a href=""> Главная</a>
                </li>
                <li className="breadcrumbs-list-elements">
                    <a href=""> Каталог товаров</a>
                </li>
                <li className="breadcrumbs-list-elements">
                    <a> Моноподы для селфи</a>
                </li>
            </ul>
        </div>
    );
};

export default Breadcrumbs;
