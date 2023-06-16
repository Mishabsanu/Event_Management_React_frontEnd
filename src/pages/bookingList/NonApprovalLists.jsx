

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { nonapprovalList } from "../../utils/Constants";
import NonApprovedBookingList from "../../components/bookingList/NonApprovedBooking";

const NonApprovedItemBookingListPage = () => {

  return (
    <div style={{backgroundColor:"white"}}>
      <Navbar />
      <div className="listContainer">
       <NonApprovedBookingList url={nonapprovalList}/>
      </div>
    </div>
  );
};

export default NonApprovedItemBookingListPage;
