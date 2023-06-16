import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { nonapprovedEventBookings } from "../../utils/Constants";

import "./ToggleBookingListPage.scss"; // Assuming you have a CSS file for this component

import NonapprovedEventBookingList from "../../components/bookingList/NonapprovalEventBooking";

const NonApproveBookingListPage = () => {


  return (
    <>
      <Navbar />
      <Header />
      <div className="listContainer">
        <NonapprovedEventBookingList url={nonapprovedEventBookings} />
      </div>
    </>
  );
};

export default NonApproveBookingListPage;
