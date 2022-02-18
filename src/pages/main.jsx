import React from "react";
import FeaturedProducts from "../components/featuredProducts";
import Page from "../components/page";
import StoreServices from "../components/storeServices";
import { Card, CardBody } from "reactstrap";

const Main = () => {
    return (
        <>
            <Page title={"Магазин Holodos.com"}>
                <Card className="card-refine">
                    <CardBody>
                        {" "}
                        <StoreServices />
                        <FeaturedProducts />
                    </CardBody>
                </Card>
            </Page>
        </>
    );
};

export default Main;
