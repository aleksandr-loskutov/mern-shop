import React from "react";
import { Link } from "react-router-dom";

const NavMenu = () => {
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
                    <ul className="submenu-main-list">
                        <li>
                            <Link to={"/catalog/odnokamernie"}>
                                Однокамерные
                            </Link>
                        </li>
                        <li>
                            <Link to={"/catalog/dvukhkamernie"}>
                                Двухкамерные
                            </Link>
                        </li>
                    </ul>
                    <ul className="submenu-main-list">
                        <li>
                            <Link to={"/catalog/side-by-side"}>
                                Side by Side
                            </Link>
                        </li>
                        <li>
                            <Link to={"/catalog/vstraivaemie-side-by-side"}>
                                Встраиваемые Side by Side
                            </Link>
                        </li>
                    </ul>
                    <ul className="submenu-main-list">
                        <li>
                            <Link to={"/catalog/minikholodilniki"}>
                                Минихолодильники
                            </Link>
                        </li>
                        <li>
                            <Link to={"/catalog/avtomobilnie"}>
                                Автомобильные
                            </Link>
                        </li>
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
