import React from "react";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import Banner from "../../components/banner/Banner";

const Home = () => {
  return (
    <div style={{backgroundColor:"white"}}>
      <Navbar />
      <Banner />
      <br />
      <br />
      <Featured />
      <br />
      <br />
      <PropertyList />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Home;
