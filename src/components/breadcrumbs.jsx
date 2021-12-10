import React from "react";
import { Col, Row, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

const BreadcrumbsComponent = ({ breadcrumbs, lastCrumbName }) => {
    const crumbs = breadcrumbs.map(({ breadcrumb }, index) => (
        <BreadcrumbItem key={breadcrumb.key}>
            {index === breadcrumbs.length - 1 ? (
                lastCrumbName ? (
                    lastCrumbName
                ) : (
                    breadcrumb
                )
            ) : (
                <Link
                    to={
                        breadcrumb.key === "/product"
                            ? "/catalog/"
                            : breadcrumb.key
                    }
                >
                    {index === breadcrumbs.length - 1 && lastCrumbName
                        ? lastCrumbName
                        : breadcrumb}
                </Link>
            )}
        </BreadcrumbItem>
    ));
    return (
        <Row className="title-row mt-3 mb-2">
            <Col className="mr-auto">
                <div className="pull-left">
                    <Breadcrumb listClassName="bg-white">{crumbs}</Breadcrumb>
                </div>
            </Col>
        </Row>
    );
};

export default BreadcrumbsComponent;
