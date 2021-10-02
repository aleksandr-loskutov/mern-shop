import React from "react";

const SearchBar = () => {
    return (
        <div className="seach-form-container">
            <form
                className="seach-form"
                action="https://echo.htmlacademy.ru/"
                method="post"
            >
                <input
                    type="text"
                    id="seach-form"
                    className="seach-form-input"
                    name="seach-form-input"
                    autoComplete="off"
                    placeholder="Поиск по сайту"
                />
                <label htmlFor="seach-form"></label>
                <button className="seach-form-button">Найти</button>
                <div className="seach-form-line"></div>
            </form>
        </div>
    );
};

export default SearchBar;
