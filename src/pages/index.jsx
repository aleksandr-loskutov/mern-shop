import React from "react";
import Footer from "../components/footer";
import IndexHeader from "../components/_prototypes/IndexHeader";
import WhiteNavbar from "../components/WhiteNavbar";
import FeaturedProducts from "../components/featuredProducts";
import SectionCards from "../components/_prototypes/SectionCards";
import Page from "../components/page";

const Index = () => {
    return (
        <>
            <WhiteNavbar />
            <IndexHeader />
            <Page>
                <FeaturedProducts />
            </Page>
            <SectionCards />
            <Footer />
        </>
    );
};

export default Index;
