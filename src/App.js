import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import CoordinatorList from "./pages/coordinatorlist/CoordinatorList";
import EventDetails from "./pages/eventdetails/EventDetail";
import ItemList from "./pages/itemLists/ItemList";
import ItemDetails from "./pages/itemDetails/ItemDetails";
import Profile from "./pages/profile/Profile";
import ToggleBookingListPage from "./pages/bookingList/BookingList";
import NonApprovedBookingListPage from "./pages/bookingList/NonApprovalLists";
import PaidBookingListPage from "./pages/bookingList/PaidBookingList";
import EventOrderListPage from "./pages/eventorderlist/EventOrderListPage";
import NonApprovedEventBookingListPage from "./pages/bookingList/NonApprovalLists";
import PaidEventBookingListPage from "./pages/eventorderlist/PaidEventBooking";
import PageNotFound from "./PageNotFound";




function App() {
  const token = useSelector((state) => state.token);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <div className="app" style={{backgroundColor:"#f5f5f5"}}>
      <Routes>
      <Route
          path="/login"
          element={ <Login />}
        />
        <Route
          path="/signup"
          element={<Signup /> }
        />

        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="/eventlist" element={token ?<CoordinatorList/>: <Navigate to="/login" />}/>
        <Route path="/eventlist/:id" element={token ?<EventDetails/>: <Navigate to="/login" />}/>
        <Route path="/itemList/" element={token ?<ItemList/>: <Navigate to="/login" />}/>
        <Route path="/itemList/:type/:id" element={token ?<ItemDetails/>: <Navigate to="/login" />}/>
        {/* <Route path="/orders/" element={token ?<UserOrder/> : <Navigate to="/login" />}/> */}
        <Route path="/profile" element={token ?<Profile/> : <Navigate to="/login" />}/>
        <Route path="/approve-booking" element={token ?<ToggleBookingListPage/> : <Navigate to="/login" />}/>
        <Route path="/non-approved-booking" element={token ?<NonApprovedBookingListPage/> : <Navigate to="/login" />}/>
        <Route path="/paid-orders" element={token ?<PaidBookingListPage/> : <Navigate to="/login" />}/>
        <Route path="/event-Booking" element={token ?<EventOrderListPage/> : <Navigate to="/login" />}/>
        <Route path="/non-approved-event-Booking" element={token ?<NonApprovedEventBookingListPage/> : <Navigate to="/login" />}/>
        <Route path="/paid-event-Booking" element={token ?<PaidEventBookingListPage/> : <Navigate to="/login" />}/>
        <Route path='*' element={<PageNotFound/>}/>

      </Routes>
    </div>
  );
}

export default App;
