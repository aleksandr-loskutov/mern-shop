import React from "react";
import { Card, CardBody, Container, FormGroup, Row } from "reactstrap";
import SearchForm from "./searchForm";
import { Breadcrumbs } from "../routing/routes";
import AdminNavbar from "./admin/adminNavbar";

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
                        <Breadcrumbs lastCrumbName={title} />
                        {search && (
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
                        )}
                        <Card className="card-refine">
                            <CardBody className="p-4">{children}</CardBody>
                        </Card>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default PageAdmin;
