import Navbar from "../../components/navbar/Navbar";
import EventOrderList from "../../components/eventOrderList/EventOrderList";

const EventOrderListPage = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar />
      <br />

      <div className="listContainer" style={{ backgroundColor: "white" }}>
        <EventOrderList />
      </div>
    </div>
  );
};

export default EventOrderListPage;
