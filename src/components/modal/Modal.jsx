import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../utils/axios";
import { itemUserBooking } from "../../utils/Constants";

import styles from "./BasicModal.module.scss";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ item, user }) {
  const [selectedDates, setSelectedDates] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setSelectedDates(today);
  }, []);

  const handleSubmit = () => {
    axios
      .post(
        itemUserBooking,
        { item, quantity, user, selectedDates },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        navigate("/itemList");
      })
      .catch((error) => {
        console.error(error);
        // Handle any error that occurs during the request
      });
  };

  return (
    <div>
      <Button style={{backgroundColor:"black",color:"white"}} onClick={handleOpen}>Rent or Book Now</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className={styles["modal-content"]}>
          <Typography variant="h6" component="h2">
            SELECT ITEMS
          </Typography>
          <hr />
          
          <div className={styles["form-group"]}>
            <label className={styles["label"]}>Quantity</label>
            <TextField
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
            />
          </div>
  
          <div className={styles["form-group"]}>
            <label className={styles["label"]}>Book Date</label>
            <DatePicker
              selected={selectedDates}
              onChange={(dates) => setSelectedDates(dates)}
              minDate={new Date()}
              dateFormat="d MMMM yyyy"
              name="checkinDate"
              className="react-datepicker-popper"
              multiple
            />
          </div>
          <div className={styles["modal-buttons"]}>
            <button
              className={styles["modal-close-button"]}
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className={styles["modal-submit-button"]}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
