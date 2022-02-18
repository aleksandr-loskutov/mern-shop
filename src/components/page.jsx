import React from "react";
import WhiteNavbar from "./WhiteNavbar";
import { Container } from "reactstrap";

function Page({ children, sectionClass, title }) {
    return (
        <>
            <WhiteNavbar />
            <div className="main">
                <div className={sectionClass || "section"}>
                    <Container>
                        {title && (
                            <h2 className="section-title text-center">
                                {title}
                            </h2>
                        )}
                        {children}
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Page;
