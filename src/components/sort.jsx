import React from "react";

function Sort(props) {
    return (
        <div className="filter-max-container">
            <div className="filter-inner-container">
                <div className="filter-title">
                    <h2>Категории:</h2>
                </div>
                <div className="sorting-container">
                    <h2>сортировка:</h2>
                    <form
                        className="sorting-container-form"
                        action="https://echo.htmlacademy.ru/"
                        method="post"
                    >
                        <div className="container-form-option">
                            <input
                                id="sorting-radio-button1"
                                className="sorting-radio-button"
                                type="radio"
                                name="sorting-radio"
                                checked
                            />
                            <label
                                className="sorting-radio-label"
                                htmlFor="sorting-radio-button1"
                            >
                                По цене
                            </label>
                            <input
                                id="sorting-radio-button2"
                                className="sorting-radio-button"
                                type="radio"
                                name="sorting-radio"
                            />
                            <label
                                className="sorting-radio-label"
                                htmlFor="sorting-radio-button2"
                            >
                                По типу
                            </label>
                            <input
                                id="sorting-radio-button3"
                                className="sorting-radio-button"
                                type="radio"
                                name="sorting-radio"
                            />
                            <label
                                className="sorting-radio-label"
                                htmlFor="sorting-radio-button3"
                            >
                                По популярности
                            </label>
                        </div>
                        <div className="container-form-minmax">
                            <input
                                id="sorting-minmax-button1"
                                className="sorting-radio-button"
                                type="radio"
                                name="sorting-radio-minmax"
                            />
                            <label
                                className="sorting-minmax sorting-max-label"
                                htmlFor="sorting-minmax-button1"
                            ></label>
                            <input
                                id="sorting-minmax-button2"
                                className="sorting-radio-button"
                                type="radio"
                                name="sorting-radio-minmax"
                                checked
                            />
                            <label
                                className="sorting-minmax sorting-min-label"
                                htmlFor="sorting-minmax-button2"
                            ></label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sort;
