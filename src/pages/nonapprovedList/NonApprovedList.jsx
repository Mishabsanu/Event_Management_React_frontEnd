
import BookingList from "../../components/bookingList/BookList";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { nonapprovalList } from "../../utils/Constants";

import "./ToggleBookingListPage.scss"; // Assuming you have a CSS file for this component
import { useState } from "react";

const ToggleBookingListPage = () => {
  const [showApproved, setShowApproved] = useState(false);

  const handleChange = (event, newAlignment) => {
    setShowApproved(newAlignment === 'approved');
  };

  return (
    <>
      <Navbar />
      <Header />
      <div className="listContainer">
       <BookingList url={ nonapprovalList} />
      </div>
    </>
  );
};

export default ToggleBookingListPage;
