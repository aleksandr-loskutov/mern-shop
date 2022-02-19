import React from "react";
import PropTypes from "prop-types";
const Title = ({ title, children }) => {
    return (
        <div className="main-catalog-container">
            <h2 className="catalog-title">{title}</h2>
            {children}
        </div>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};
export default Title;
