import React from "react";
import { Container } from "reactstrap";
import AdminNavbar from "./AdminNavbar";
import FooterBlack from "../kit/Footers/FooterBlack";

function PageAdmin({ children, sectionClass, title }) {
    return (
        <>
            <AdminNavbar />
            <div className="main">
                <div className={sectionClass || "section"}>
                    <Container>
                        {title && (
                            <h2 className="section-title text-center mb-3">
                                {title}
                            </h2>
                        )}
                        {children}
                    </Container>
                </div>
            </div>
            <FooterBlack />
        </>
    );
}

export default PageAdmin;
