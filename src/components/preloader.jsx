import React from "react";

function Preloader({ type, mx, my }) {
    return (
        <div className="d-flex">
            {type === "big" ? (
                <div
                    className={`uil-reload-css reload-background mr-1 ${mx} ${my}`}
                >
                    <div />
                </div>
            ) : (
                <div className={`uil-reload-css reload-small mr-1 ${mx} ${my}`}>
                    <div />
                </div>
            )}
        </div>
    );
}
Preloader.defaultProps = {
    type: "big",
    mx: "mx-auto",
    my: "my-auto"
};
export default Preloader;
