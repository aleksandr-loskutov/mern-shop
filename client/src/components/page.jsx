import React from "react";
import WhiteNavbar from "./whiteNavbar";
import { Container } from "reactstrap";

function Page({ children, sectionClass, title }) {
    return (
        <>
            <WhiteNavbar />
            <div className="main">
                <div className={sectionClass || "section"}>
                    <Container>
                        {title && (
                            <h3 className="section-title text-center">
                                {title}
                            </h3>
                        )}
                        {children}
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Page;
