
import BookingList from "../../components/bookingList/BookList";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { approvalList } from "../../utils/Constants";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./ToggleBookingListPage.scss"; // Assuming you have a CSS file for this component
import { useState } from "react";

const ToggleBookingListPage = () => {

  return (
    <div style={{backgroundColor:"white"}}>
      <Navbar />

      <div className="listContainer">
       <BookingList url={ approvalList} />
      </div>
    </div>
  );
};

export default ToggleBookingListPage;
