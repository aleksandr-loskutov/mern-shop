import React from "react";

function Footer(props) {
    return (
        <footer className="footer-container">
            <div className="main-footer">
                <div className="footer-column-1">
                    <div className="footer-img">
                        <a href="">
                            <img
                                alt="Логотип"
                                src="img/logo-white.svg"
                                width="auto"
                                height="60"
                            />
                        </a>
                    </div>
                    <div className="footer-active-block-container">
                        <div className="footer-active-block-elements footer-active-1">
                            <a href="">
                                <img
                                    alt="логин"
                                    src="img/icon_user.svg"
                                    width="13"
                                    height="14"
                                />
                                Валентин Валентинов
                            </a>
                            <a href="" className="footer-element-user-inlogin">
                                Выйти
                            </a>
                        </div>
                        <div className="footer-active-block-elements footer-active-2">
                            <a
                                className="footer-active-block-elements-link"
                                href=""
                            >
                                <img
                                    alt="сравнить"
                                    src="img/icon_chart.svg"
                                    width="14"
                                    height="14"
                                />
                                Сравнить
                            </a>
                        </div>
                        <div className="footer-active-block-elements footer-active-3">
                            <a
                                className="footer-active-block-elements-link"
                                href=""
                            >
                                <img
                                    alt="корзина"
                                    src="img/icon_cart.svg"
                                    width="10"
                                    height="10"
                                />
                                Корзина
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-column-2">
                    <div className="adress">
                        <p>г. СПб, ул. Русских хакеров, 15</p>
                    </div>
                    <ul className="footer-menu">
                        <li className="footer-menu-elements">
                            <a href="blank.html">доставка</a>
                        </li>
                        <li className="footer-menu-elements">
                            <a href="blank.html">гарантия</a>
                        </li>
                        <li className="footer-menu-elements">
                            <a href="blank.html">контакты</a>
                        </li>
                    </ul>
                    <div className="tel">
                        <p>
                            Тел.:
                            <a href="tel:+74954959595"> +7 (495) 495-95-95</a>
                        </p>
                    </div>
                </div>
                <div className="footer-column-3">
                    <div className="footer-line"></div>
                    <ul className="social">
                        <li>
                            <a href="">
                                <img
                                    alt="facebook"
                                    src="img/icon_facebook.svg"
                                    width="32"
                                    height="32"
                                />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img
                                    alt="instagram"
                                    src="img/icon_instagram.svg"
                                    width="32"
                                    height="32"
                                />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img
                                    alt="twitter"
                                    src="img/icon_twitter.svg"
                                    width="32"
                                    height="32"
                                />
                            </a>
                        </li>
                    </ul>
                    <div className="creator">
                        <a href="">
                            <img
                                alt="создатель шаблона html"
                                src="img/logo.svg"
                                width="27"
                                height="34"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
