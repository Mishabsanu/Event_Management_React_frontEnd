

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
// import "./ToggleBookingListPage.scss"; // Assuming you have a  file for this component
import PaidEventBookingList from "../../components/bookingList/PaidEventBookingList";

const PaidEventBookingListPage = () => {

  return (
    <div style={{backgroundColor:"white"}}>
      <Navbar />

      <div className="listContainer">
       <PaidEventBookingList/>
      </div>
    </div>
  );
};

export default PaidEventBookingListPage;
