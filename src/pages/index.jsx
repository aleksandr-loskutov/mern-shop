import React from "react";
import Footer from "../components/footer";
import IndexHeader from "../components/IndexHeader";
import WhiteNavbar from "../components/WhiteNavbar";
import FeaturedProducts from "../components/featuredProducts";
import SectionCards from "../components/SectionCards";
import Section from "../components/section";

const Index = () => {
    return (
        <>
            <WhiteNavbar />
            <IndexHeader />
            <Section>
                <FeaturedProducts />
            </Section>
            <SectionCards />
            <Footer />
        </>
    );
};

export default Index;
