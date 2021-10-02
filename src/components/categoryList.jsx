import React from "react";

const CategoryList = () => {
    return (
        <div className="filter">
            <form action="https://echo.htmlacademy.ru/" method="post">
                <div className="filter-top-line">
                    <fieldset className="filter-color">
                        <legend className="filter-legend">Цвет</legend>
                        <ul className="filter-checkbox-list">
                            <li className="filter-checkbox-elements">
                                <input
                                    type="checkbox"
                                    name="filter-checkbox-black"
                                    className="filter-checkbox-button"
                                    id="filter-checkbox-button1"
                                    checked
                                />
                                <label
                                    className="filter-checkbox-label"
                                    htmlFor="filter-checkbox-button1"
                                ></label>
                                <p>Черный</p>
                            </li>
                            <li className="filter-checkbox-elements">
                                <input
                                    type="checkbox"
                                    name="filter-checkbox-white"
                                    className="filter-checkbox-button"
                                    id="filter-checkbox-button2"
                                />
                                <label
                                    className="filter-checkbox-label"
                                    htmlFor="filter-checkbox-button2"
                                ></label>
                                <p>Белый</p>
                            </li>
                            <li className="filter-checkbox-elements">
                                <input
                                    type="checkbox"
                                    name="filter-checkbox-blue"
                                    className="filter-checkbox-button"
                                    id="filter-checkbox-button3"
                                    checked
                                />
                                <label
                                    className="filter-checkbox-label"
                                    htmlFor="filter-checkbox-button3"
                                ></label>
                                <p>Синий</p>
                            </li>
                            <li className="filter-checkbox-elements">
                                <input
                                    type="checkbox"
                                    name="filter-checkbox-red"
                                    className="filter-checkbox-button"
                                    id="filter-checkbox-button4"
                                    checked
                                />
                                <label
                                    className="filter-checkbox-label"
                                    htmlFor="filter-checkbox-button4"
                                ></label>
                                <p>Красный</p>
                            </li>
                            <li className="filter-checkbox-elements">
                                <input
                                    type="checkbox"
                                    name="filter-checkbox-pink"
                                    className="filter-checkbox-button"
                                    id="filter-checkbox-button5"
                                />
                                <label
                                    className="filter-checkbox-label"
                                    htmlFor="filter-checkbox-button5"
                                ></label>
                                <p>Розовый</p>
                            </li>
                        </ul>
                    </fieldset>
                </div>
                <div className="filter-top-line"></div>
                <button className="button-filter">показать</button>
            </form>
        </div>
    );
};

export default CategoryList;
