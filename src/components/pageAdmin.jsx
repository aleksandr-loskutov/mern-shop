import React from "react";
import { Col, Container, FormGroup, Row } from "reactstrap";
import AdminNavbar from "./AdminNavbar";
import SearchForm from "./searchForm";
import { Breadcrumbs } from "../routing/routes";

function PageAdmin({
    children,
    sectionClass,
    title,
    search,
    onSearch,
    searchQuery,
    searchTip
}) {
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
                        {search ? (
                            <Row className="justify-content-center">
                                <FormGroup className="">
                                    <SearchForm
                                        autoFocus
                                        value={searchQuery}
                                        showButton={false}
                                        placeholder={searchTip || "поиск.."}
                                        onChange={onSearch}
                                    />
                                </FormGroup>
                            </Row>
                        ) : (
                            <Row className="justify-content-center">
                                {" "}
                                <Breadcrumbs lastCrumbName={title} />
                            </Row>
                        )}
                        {children}
                    </Container>
                </div>
            </div>
        </>
    );
}

export default PageAdmin;
