import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/actions/categories";

const NavMenu = () => {
    const state = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    return (
        <nav className="main-menu">
            <div className="menu-catalog">
                <Link to={"/catalog/"} className="main-menu-link">
                    каталог товаров
                </Link>
                <img
                    alt="крест-раскрытие-меню"
                    src="/img/cross.png"
                    width="15"
                    height="15"
                />

                <div className="submenu">
                    <ul className={"submenu-main-list"}>
                        {state.categories.length > 0 &&
                            state.categories.map((cat) => (
                                <li key={cat._id}>
                                    <Link to={`/catalog/${cat.urlAlias}`}>
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <ul className="main-menu-list">
                <li className="main-menu-elements">
                    <a className="main-menu-link" href="blank.html">
                        доставка
                    </a>
                </li>
                <li className="main-menu-elements">
                    <a className="main-menu-link" href="blank.html">
                        гарантия
                    </a>
                </li>
                <li className="main-menu-elements">
                    <a className="main-menu-link" href="blank.html">
                        контакты
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default NavMenu;
