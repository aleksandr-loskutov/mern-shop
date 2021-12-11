import React from "react";

function Preloader({ type, mx, my, blockClass }) {
    return (
        <div className={`d-flex ${blockClass}`}>
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
    my: "my-auto",
    blockClass: ""
};
export default Preloader;
