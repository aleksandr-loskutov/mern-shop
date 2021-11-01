import React from "react";
import Footer from "../components/footer";
import IndexHeader from "../components/IndexHeader";
import WhiteNavbar from "../components/WhiteNavbar";

import FeaturedProducts from "../components/featuredProducts";
import SectionCards from "../components/SectionCards";

const Index = () => {
    return (
        <>
            <WhiteNavbar />
            <IndexHeader />
            <div className="main">
                <FeaturedProducts />
            </div>
            <SectionCards />
            <Footer />
        </>
    );
};

export default Index;
