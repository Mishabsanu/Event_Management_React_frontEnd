import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "../../utils/axios";
import { Typography } from "@mui/material";
import { eventUserBooking } from "../../utils/Constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./modal.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 400,
  bgcolor: "#f5f5f5",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EventModal({ event, user, eventname }) {
  const [selectedDatefrom, setSelectedDatefrom] = useState(null);
  const [selectedDateto, setSelectedDateto] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState("");

  const handleClose = () => {
    setOpen(false);
    setQuantity("");
    setSelectedDatefrom(null);
    setSelectedDateto(null);
  };

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setSelectedDatefrom(today);
    setSelectedDateto(today);
  }, []);

  const handleSubmit = () => {
    const payload = {
      event,
      user,
      selectedDatefrom,
      selectedDateto,
    };

    axios
      .post(eventUserBooking, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Event booking successful!");
        navigate("/event-Booking");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error("An error occurred.");
        }
      });
  };

  return (
    <div>
      
      <Button style={{backgroundColor:"black",color:"white"}} onClick={handleOpen}>Reserve or Book Now!</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-container">
          <Typography variant="h6" component="h2">
            SELECT EVENT MANAGEMENT
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <div className="date-picker-container">
              <div className="date-picker-label">
                <Typography variant="body1" component="span">
                  Book Date From:
                </Typography>
              </div>
              <DatePicker
                selected={selectedDatefrom}
                onChange={(date) => setSelectedDatefrom(date)}
                minDate={new Date()}
                dateFormat="d MMMM yyyy"
                name="checkinDate"
                className="react-datepicker-popper"
              />
            </div>
            <div className="date-picker-container">
              <div className="date-picker-label">
                <Typography variant="body1" component="span">
                  Book Date To:
                </Typography>
              </div>
              <DatePicker
                selected={selectedDateto}
                onChange={(date) => setSelectedDateto(date)}
                minDate={new Date()}
                dateFormat="d MMMM yyyy"
                name="checkoutDate"
                className="react-datepicker-popper"
              />
            </div>
          </Typography>
          <Button  onClick={handleSubmit} fullWidth>
            Submit
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
