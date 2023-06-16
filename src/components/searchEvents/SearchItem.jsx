import { Link } from "react-router-dom";
import "./searchItem.scss";
import Button from "@mui/material/Button";
const SearchEvent = (props) => {

  const formatDate = (dateString) => {
    const dateStr = "2023-05-11T12:33:00Z";
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate; // returns date in a readable format
  };
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">
          {props.name} | {props.cord.toUpperCase().split("@")[0]}
        </h1>
        <span className="siDistance">Capacity:{props.capacity}</span>
        <span className="siTaxiOp">
          {props.cord.toUpperCase().split("@")[0]}
        </span>
        <span className="siSubtitle">
          Date Available: {formatDate(props.date_available)}
        </span>
        <span className="siDistance">{props.description}</span>
        <span className="siFeatures">
        Event • {props.name.split(' ')[1]} • full event
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
         
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">₹ {props
                    ? Math.floor(props.price).toLocaleString("en-IN")
                    : ""}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/eventlist/${props.id}`}>
          
          <Button style={{backgroundColor:"black",color:"white"}}>See availability</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchEvent;
