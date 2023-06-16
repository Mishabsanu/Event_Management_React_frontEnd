import { useState } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { signUpUser } from "../../utils/Constants";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import React from "react";

const validate = (values) => {
  const errors = {};
  //username
  if (!values.firstname) {
    errors.firstname = toast.error("firstname is required");
  } else if (values.firstname.includes(" ")) {
    errors.firstname = toast.error("Invalid firstname");
  // } else if (
  //   /[0-9\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g.test(
  //     values.firstname
  //   )
  // ) {
  //   errors.firstname = toast.error(
  //     " firstname does not contain special characters "
  //   );
  }

  if (!values.lastname) {
    errors.lastname = toast.error("firstname is required");
  } else if (values.lastname.includes(" ")) {
    errors.lastname = toast.error("Invalid firstname");
  // } else if (
  //   /[0-9\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g.test(
  //     values.lastname
  //   )
  // ) {
  //   errors.lastname = toast.error(
  //     " firstname does not contain special characters "
  //   );
  }

  //email
  if (!values.email) {
    errors.email = toast.error("email is requried");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = toast.error("invalid email address");
  }

  //password
  if (!values.password) {
    errors.password = toast.error("password is required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("wrong password");
  } else if (values.password.length < 8) {
    errors.password = toast.error("password atleast contain five characters");
  }

  return errors;
};

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { values: res } = await axios.post(signUpUser, values);
        setTimeout(() => {
          navigate("/login");
        }, 2000);

        toast.success("Signup successful!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    },
  });

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>WELCOME</h1>
          <Toaster position="top-center" reverseOrder={false}></Toaster>

          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              LOGIN
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form
            method="POST"
            className={styles.form_container}
            onSubmit={formik.handleSubmit}
          >
            <h1>
              CREATE <span style={{ color: "blue" }}>ACCOUNT</span>
            </h1>
            <br />
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              SIGN UP
            </button>
          </form>
          <ToastContainer />
          <span className={styles.loginSpan}>
            Don't have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
