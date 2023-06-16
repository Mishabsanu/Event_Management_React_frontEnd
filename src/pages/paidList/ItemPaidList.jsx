
import BookingList from "../../components/bookingList/BookList";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { approvalList } from "../../utils/Constants";

import "./ToggleBookingListPage.scss";

const ItemPaidList = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className="listContainer">
       <BookingList url={ approvalList} />
      </div>
    </>
  );
};

export default ItemPaidList;
