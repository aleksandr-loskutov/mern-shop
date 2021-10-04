import React from "react";
import NavBar from "../components/navBar";
import Footer from "../components/footer";

const Main = () => {
    return (
        <>
            <NavBar />
            <main className="main">
                <div className="slider-container">
                    <div className="slider slide-1" id="slide-1">
                        <div className="slider-img">
                            <img
                                className="slider-img1"
                                alt="слайд 1"
                                src="img/slide-1.png"
                                width="490"
                                height="486"
                            />
                        </div>
                        <div className="slider-main">
                            <div className="slider-main-line"></div>
                            <div className="slider-main-number">
                                <img
                                    alt="цифра 1"
                                    src="img/01.png"
                                    width="164"
                                    height="131"
                                />
                            </div>
                            <h2 className="slider-main-title">
                                Делай селфи,
                                <br /> как Бен Стиллер!
                            </h2>
                            <p className="slider-main-text">
                                Самая длинная палка для селфи доступна в нашем
                                магазине.
                                <br />
                                Восемь (Восемь, Карл!) метров длиной и весом
                                всего 5 килограмм.
                            </p>
                            <div className="slider-main-button-container">
                                <button className="button-main">
                                    Подробнее
                                </button>
                            </div>
                            <div className="slider-main-atributes">
                                <div>
                                    <h2>8,5 м</h2>
                                    <p>Длина палки</p>
                                </div>
                                <div>
                                    <h2>5 кг</h2>
                                    <p>Вес палки</p>
                                </div>
                                <div>
                                    <h2>Карбон</h2>
                                    <p>Материал</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider slide-2" id="slide-2">
                        <div className="slider-img">
                            <img
                                className="slider-img2"
                                alt="слайд 2"
                                src="img/slide-2.png"
                                width="490"
                                height="485"
                            />
                        </div>
                        <div className="slider-main">
                            <div className="slider-main-line"></div>
                            <div className="slider-main-number">
                                <img
                                    alt="цифра 2"
                                    src="img/02.png"
                                    width="194"
                                    height="131"
                                />
                            </div>
                            <h2 className="slider-main-title">
                                Худеем
                                <br /> правильно!
                            </h2>
                            <p className="slider-main-text">
                                Мотивирующие фитнес-браслеты помогут найти в
                                себе силы <br />
                                не пропускать занятия и соблюдать диету.
                            </p>
                            <div className="slider-main-button-container">
                                <button className="button-main">
                                    Подробнее
                                </button>
                            </div>
                            <div className="slider-main-atributes">
                                <div>
                                    <h2>48 часов</h2>
                                    <p>Без подзарядки</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider slide-3" id="slide-3">
                        <div className="slider-img">
                            <img
                                className="slider-img3"
                                alt="слайд 3"
                                src="img/slide-3.png"
                                width="526"
                                height="547"
                            />
                        </div>
                        <div className="slider-main">
                            <div className="slider-main-line"></div>
                            <div className="slider-main-number">
                                <img
                                    alt="цифра 3"
                                    src="img/03.png"
                                    width="196"
                                    height="131"
                                />
                            </div>
                            <h2 className="slider-main-title">
                                Порхает как бабочка,
                                <br />
                                жалит как пчела!
                            </h2>
                            <p className="slider-main-text">
                                Этот обычный, на первый взгляд, квадрокоптер
                                оснащен <br />
                                мощным лазером, замаскированным под стандартную
                                камеру.
                            </p>
                            <div className="slider-main-button-container">
                                <button className="button-main">
                                    Подробнее
                                </button>
                            </div>
                            <div className="slider-main-atributes">
                                <div>
                                    <h2>800 м</h2>
                                    <p>Дальность полета</p>
                                </div>
                                <div>
                                    <h2>50 м</h2>
                                    <p>Радиус поражения</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-main-radio">
                        <input
                            onClick="slideActive1()"
                            className="slider-main-input"
                            type="radio"
                            name="slider-main-input"
                            id="slider-main-radio1"
                            checked
                        />
                        <label
                            className="slider-main-label"
                            htmlFor="slider-main-radio1"
                        ></label>
                        <input
                            onClick="slideActive2()"
                            className="slider-main-input"
                            type="radio"
                            name="slider-main-input"
                            id="slider-main-radio2"
                        />
                        <label
                            className="slider-main-label"
                            htmlFor="slider-main-radio2"
                        ></label>
                        <input
                            onClick="slideActive3()"
                            className="slider-main-input"
                            type="radio"
                            name="slider-main-input"
                            id="slider-main-radio3"
                        />
                        <label
                            className="slider-main-label"
                            htmlFor="slider-main-radio3"
                        ></label>
                    </div>
                </div>
                <div className="main-catalog">
                    <div className="main-catalog-elements">
                        <a href="catalog.html" className="main-catalog-img">
                            <img
                                alt="Виртуальная реальность"
                                src="img/popular-1.svg"
                                width="98"
                                height="55"
                            />
                        </a>
                        <a
                            className="main-catalog-elements-text"
                            href="catalog.html"
                        >
                            Виртуальная
                            <br /> реальность
                        </a>
                    </div>
                    <div className="main-catalog-elements">
                        <a href="catalog.html" className="main-catalog-img">
                            <img
                                alt="Моноподы"
                                src="img/popular-2.svg"
                                width="86"
                                height="117"
                            />
                        </a>
                        <a
                            className="main-catalog-elements-text"
                            href="catalog.html"
                        >
                            Моноподы
                            <br /> для селфи
                        </a>
                    </div>
                    <div className="main-catalog-elements">
                        <a href="catalog.html" className="main-catalog-img">
                            <img
                                alt="Экшн-камеры"
                                src="img/popular-3.svg"
                                width="71"
                                height="87"
                            />
                        </a>
                        <a
                            className="main-catalog-elements-text"
                            href="catalog.html"
                        >
                            Экшн-камеры
                        </a>
                    </div>
                    <div className="main-catalog-elements">
                        <a href="catalog.html" className="main-catalog-img">
                            <img
                                alt="Фитнес-браслеты"
                                src="img/popular-4.svg"
                                width="107"
                                height="65"
                            />
                        </a>
                        <a
                            className="main-catalog-elements-text"
                            href="catalog.html"
                        >
                            Фитнес-
                            <br />
                            браслеты
                        </a>
                    </div>
                    <div className="main-catalog-elements">
                        <a href="catalog.html" className="main-catalog-img">
                            <img
                                alt="Умные часы"
                                src="img/popular-5.svg"
                                width="56"
                                height="98"
                            />
                        </a>
                        <a
                            className="main-catalog-elements-text"
                            href="catalog.html"
                        >
                            Умные часы
                        </a>
                    </div>
                    <div className="main-catalog-elements">
                        <a href="catalog.html" className="main-catalog-img">
                            <img
                                alt="Квадрокоптеры"
                                src="img/popular-6.svg"
                                width="132"
                                height="69"
                            />
                        </a>
                        <a
                            className="main-catalog-elements-text"
                            href="catalog.html"
                        >
                            Квадрокоптеры
                        </a>
                    </div>
                </div>
                <div className="info-container">
                    <div className="info">
                        <div className="info-slider">
                            <input
                                onClick="infoSlideActive1()"
                                className="info-slider-input"
                                type="radio"
                                name="button"
                                checked
                                id="info-slider-delivery"
                            />
                            <label
                                className="info-slider-label"
                                htmlFor="info-slider-delivery"
                            >
                                Доставка
                            </label>
                            <input
                                onClick="infoSlideActive2()"
                                className="info-slider-input"
                                type="radio"
                                name="button"
                                id="info-slider-garanty"
                            />
                            <label
                                className="info-slider-label"
                                htmlFor="info-slider-garanty"
                            >
                                Гарантия
                            </label>
                            <input
                                onClick="infoSlideActive3()"
                                className="info-slider-input"
                                type="radio"
                                name="button"
                                id="info-slider-credit"
                            />
                            <label
                                className="info-slider-label"
                                htmlFor="info-slider-credit"
                            >
                                Кредит
                            </label>
                        </div>
                        <div
                            className="right-side right-side1"
                            id="right-side1"
                        >
                            <h2 className="right-side-title">Доставка</h2>
                            <p className="right-side-text">
                                Мы с удовольствием доставим ваш товар прямо к
                                вашему подъезду совершенно бесплатно! Ведь мы
                                неплохо <br />
                                заработаем, поднимая его на ваш этаж.
                            </p>
                            <img
                                alt="курьер"
                                className="right-side-img"
                                src="img/delivery.svg"
                                width="136"
                                height="164"
                            />
                        </div>
                        <div
                            className="right-side right-side2"
                            id="right-side2"
                        >
                            <h2 className="right-side-title">Гарантия</h2>
                            <p className="right-side-text">
                                Если из-за возгорания купленного у нас товара у
                                вас сгорит дом — не переживайте, мы выдадим вам
                                новый.
                                <br />
                                Товар, не дом, конечно же.
                            </p>
                            <img
                                alt="гарантия"
                                className="right-side-img"
                                src="img/warranty.svg"
                                width="171"
                                height="195"
                            />
                        </div>
                        <div
                            className="right-side right-side3"
                            id="right-side3"
                        >
                            <h2 className="right-side-title">Кредит</h2>
                            <p className="right-side-text">
                                Залезть в долговую яму стало проще! Кредитные
                                консультанты подберут для вас наиболее выгодные{" "}
                                <br />
                                условия кредита. Выгодные для нашего банка,
                                разумеется.
                            </p>
                            <img
                                alt="кредит"
                                className="right-side-img"
                                src="img/credit.svg"
                                width="156"
                                height="188"
                            />
                        </div>
                    </div>
                </div>
                <div className="partners">
                    <a href="#">
                        <img
                            alt="партнер1"
                            src="img/logo-1.png"
                            width="260"
                            height="100"
                        />{" "}
                    </a>
                    <a href="#">
                        <img
                            alt="партнер2"
                            src="img/logo-2.png"
                            width="260"
                            height="100"
                        />{" "}
                    </a>
                    <a href="#">
                        <img
                            alt="партнер3"
                            src="img/logo-3.png"
                            width="260"
                            height="100"
                        />{" "}
                    </a>
                    <a href="#">
                        <img
                            alt="партнер4"
                            src="img/logo-4.png"
                            width="260"
                            height="100"
                        />{" "}
                    </a>
                </div>
                <div className="contact-info">
                    <div className="about-us">
                        <div className="top-line"></div>
                        <h2 className="about-us-title">О нас</h2>
                        <p className="about-us-text">
                            Огромный выбор гаджетов не оставит равнодушным гика,
                            который есть в каждом из нас.
                        </p>
                        <p className="about-us-text">
                            Мы можем доставить ваш товар в самые отдаленные
                            точки России! DEVICE
                            <br /> работает со многими транспортными компаниями:
                        </p>
                        <ul className="about-us-delivery">
                            <li>Деловые линии</li>
                            <li>Автотрейдинг</li>
                            <li>ЖелДорЭкспедиция</li>
                        </ul>
                        <button className="button-main testt">
                            подробнее о нас
                        </button>
                    </div>
                    <div className="contacts">
                        <div className="top-line"></div>
                        <h2 className="contacts-title">Контакты</h2>
                        <p className="contacts-text">
                            Вы можете забрать товар сами, заехав в наш офис.
                            Заодно, вы сможете проверить работоспособность
                            покупки. Всякое бывает.
                        </p>
                        <div className="map" onClick="showMap()">
                            <img
                                alt="Карта"
                                src="img/map.png"
                                width="560"
                                height="222"
                            />
                        </div>
                        <button
                            onClick="openFeedbackForm()"
                            className="button-main"
                        >
                            напишите нам
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Main;
