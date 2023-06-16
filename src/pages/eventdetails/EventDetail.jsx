import "./eventdetails.scss";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCordinatorEvent } from "../../utils/Constants";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import EventModal from "../../components/eventModal/EventModal";
import { ToastContainer } from "react-toastify";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link> / <span>Events Details</span>
    </div>
  );
};

const EventDetails = () => {
  const formatDate = (dateString) => {
    const dateStr = "2023-05-11T12:33:00Z";
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate; // returns date in a readable format
  };
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [slideNumber, setSlideNumber] = useState(0);
  const [events, setEvents] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const getEvents = async () => {
    axios
      .get(`${getCordinatorEvent}${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log(error.response.data.message);
        }
      });
  };
  useEffect(() => {
    getEvents();
  }, []);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div style={{backgroundColor:"white"}}>
      <br/>
      <Navbar />
  
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          
          <h1 className="hotelTitle">
            {events
              ? `${events.event.name} | ${
                  events.coordinator.username.toUpperCase().split("@")[0]
                }`
              : ""}
          </h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>
              location{" "}
              <strong style={{ fontSize: "1.6em" }}>
                {events ? `${events.location}` : ""}
              </strong>
            </span>
          </div>
          <span className="hotelDistance">
            Total capacity – {events.capacity} of Person
          </span>
          <span className="hotelPriceHighlight">
            Love, Celebration, Union, Enchantment, Togetherness, Joy,
            Everlasting, Romance, Magic, Memories
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">
                Everlasting Love: A Celebration of Uniting Souls
              </h1>
              <p className="hotelDesc">
                Join us as we embark on a journey of love and togetherness at
                our enchanting marriage event, "Everlasting Love." This
                extraordinary occasion will bring together two souls, bound by
                love and destined for a lifetime of happiness. Amidst the
                picturesque surroundings of our elegant venue, witness the union
                of two hearts in a celebration that epitomizes the beauty and
                strength of love. Prepare to be captivated by heartfelt vows,
                tender moments, and the unbreakable bond that forms when two
                individuals commit to a lifetime of love and
                companionship.Immerse yourself in an atmosphere of joy and
                merriment as we rejoice in the union of two families, coming
                together as one.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1> Date Available: {formatDate(events.date_available)}</h1>
              <span>
                Event • {events ? `${events.event.name.split(" ")[1]}` : ""} •
                (1 Full day)
              </span>
              <h2>
                <b>
                  ₹
                  {events
                    ? Math.floor(events.price).toLocaleString("en-IN")
                    : ""}
                </b>
              </h2>
              <EventModal
                event={events.id}
                eventname={events ? events.event.name : ""}
                user={user.username}
                avialiable={events.date_available}
                className="bookNow"
              />
            </div>
          </div>
          <ToastContainer />
        </div>
<br/>
        <Footer />
      </div>
    </div>
  );
};

export default EventDetails;
