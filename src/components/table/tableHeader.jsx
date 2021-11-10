import React from "react";
// import PropTypes from "prop-types";
const TableHeader = ({ columns }) => {
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th className="text-center" key={column} scope="col">
                        {columns[column].name}{" "}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
