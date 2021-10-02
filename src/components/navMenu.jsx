import React from "react";

const NavMenu = () => {
    return (
        <nav className="main-menu">
            <div className="menu-catalog">
                <a className="main-menu-link" href="catalog.html">
                    каталог товаров
                </a>
                <img
                    alt="крест-раскрытие-меню"
                    src="img/cross.png"
                    width="15"
                    height="15"
                />
                <div className="submenu">
                    <ul className="submenu-main-list">
                        <li>
                            <a href="catalog.html">Виртуальная реальность</a>
                        </li>
                        <li>
                            <a href="catalog.html">Моноподы для селфи</a>
                        </li>
                        <li>
                            <a href="catalog.html">Экшн-камеры</a>
                        </li>
                    </ul>
                    <ul className="submenu-main-list">
                        <li>
                            <a href="catalog.html">Фитнес-браслеты</a>
                        </li>
                        <li>
                            <a href="catalog.html">Умные часы</a>
                        </li>
                    </ul>
                    <ul className="submenu-main-list">
                        <li>
                            <a href="catalog.html">Квадрокоптер</a>
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
