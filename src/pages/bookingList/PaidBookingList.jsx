

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./ToggleBookingListPage.scss"; // Assuming you have a CSS file for this component
import PaidBookingList from "../../components/bookingList/PaidBookingList";

const PaidBookingListPage = () => {

  return (
    <div style={{backgroundColor:"white"}}>
      <Navbar />

      <div className="listContainer">
       <PaidBookingList/>
      </div>
    </div>
  );
};

export default PaidBookingListPage;
