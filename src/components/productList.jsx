import React from "react";

const ProductList = () => {
    return (
        <div className="catalog">
            <div className="catalog-elements">
                <div className="catalog-elements-hover-active">
                    <div className="button-main-container">
                        <button className="button-main-catalog">
                            в корзину
                        </button>
                        <div className="button-main-catalog-background"></div>
                    </div>
                    <a className="catalog-elements-link" href="">
                        Добавить к сравнению
                    </a>
                </div>
                <img
                    alt="товар1"
                    src="img/item-1.jpg"
                    width="360"
                    height="380"
                />
                <div className="catalog-elements-text">
                    <a href="blank.html">
                        <p className="catalog-elements-text-description">
                            Любительская селфи-палка
                        </p>
                    </a>
                    <p className="catalog-elements-text-cell">1 100 руб.</p>
                </div>
            </div>
            <div className="catalog-elements">
                <div className="catalog-elements-hover">
                    <div className="button-main-container">
                        <button className="button-main-catalog">
                            в корзину
                        </button>
                        <div className="button-main-catalog-background"></div>
                    </div>
                    <a className="catalog-elements-link" href="">
                        Добавить к сравнению
                    </a>
                </div>
                <img
                    alt="товар2"
                    src="img/item-2.jpg"
                    width="360"
                    height="380"
                />
                <div className="catalog-elements-text">
                    <a href="blank.html">
                        <p className="catalog-elements-text-description">
                            Профессиональная
                            <br /> селфи-палка
                        </p>
                    </a>
                    <p className="catalog-elements-text-cell">1 500 руб.</p>
                </div>
            </div>
            <div className="catalog-elements">
                <div className="catalog-elements-hover">
                    <div className="button-main-container">
                        <button className="button-main-catalog">
                            в корзину
                        </button>
                        <div className="button-main-catalog-background"></div>
                    </div>
                    <a className="catalog-elements-link" href="">
                        Добавить к сравнению
                    </a>
                </div>
                <img
                    alt="товар3"
                    src="img/item-3.jpg"
                    width="360"
                    height="380"
                />
                <div className="catalog-elements-text">
                    <a href="blank.html">
                        <p className="catalog-elements-text-description">
                            Непотопляемая
                            <br /> селфи-палка
                        </p>
                    </a>
                    <p className="catalog-elements-text-cell">1 500 руб.</p>
                </div>
            </div>
            <div className="catalog-elements">
                <div className="new-catalog-element"></div>
                <div className="catalog-elements-hover">
                    <div className="button-main-container">
                        <button className="button-main-catalog">
                            в корзину
                        </button>
                        <div className="button-main-catalog-background"></div>
                    </div>
                    <a className="catalog-elements-link" href="">
                        Добавить к сравнению
                    </a>
                </div>
                <img
                    alt="товар4"
                    src="img/item-4.jpg"
                    width="360"
                    height="380"
                />
                <div className="catalog-elements-text">
                    <a href="blank.html">
                        <p className="catalog-elements-text-description">
                            Селфи-палка «Следуй за <br />
                            мной»
                        </p>
                    </a>
                    <p className="catalog-elements-text-cell">1 900 руб.</p>
                </div>
            </div>
            <div className="paginator-container">
                <div className="paginator">
                    <a className="paginator-list-back" href="">
                        назад
                    </a>
                    <ul className="paginator-list">
                        <li className="paginator-list-elements">
                            <a className="paginator-active-page" href="">
                                1
                            </a>
                        </li>
                        <li className="paginator-list-elements">
                            <a href="">2</a>
                        </li>
                        <li className="paginator-list-elements">
                            <a href="">3</a>
                        </li>
                    </ul>
                    <a className="paginator-list-forward" href="">
                        вперед
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
