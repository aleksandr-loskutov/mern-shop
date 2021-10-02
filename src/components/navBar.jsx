import React from "react";
import NavMenu from "./navMenu";
import SearchBar from "./searchBar";
const NavBar = () => {
    return (
        <header className="main-header">
            <div className="main-logo">
                <a href="index.html">
                    <img
                        alt="Логотип"
                        src="img/logo.svg"
                        width="150"
                        height="48"
                    />
                </a>
            </div>
            <div className="active-block">
                <SearchBar />
                <div className="active-block-container">
                    <div className="active-block-elements element-user">
                        <a href="">
                            <img
                                alt="логин"
                                src="img/icon_user_header.svg"
                                width="14"
                                height="14"
                            />
                            Валентин Валентинов
                        </a>
                        <a href="" className="element-user-inlogin">
                            Выйти
                        </a>
                    </div>
                    <div className="active-block-elements element-compare">
                        <a href="">
                            <img
                                alt="сравнение"
                                src="img/icon_chart_header.svg"
                                width="13"
                                height="14"
                            />
                            Сравнить
                        </a>
                    </div>
                    <div className="active-block-elements element-cart">
                        <a href="">
                            <img
                                alt="корзина"
                                src="img/icon_cart_header.svg"
                                width="10"
                                height="10"
                            />
                            Корзина
                        </a>
                    </div>
                </div>
            </div>
            <NavMenu />
        </header>
    );
};

export default NavBar;
