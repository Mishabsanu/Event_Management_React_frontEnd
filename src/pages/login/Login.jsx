import { useState, useMemo, useEffect } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./style.module.scss";
import { userLogin } from "../../utils/Constants";
import { setLogin } from "../../Redux/store";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  //email
  if (!values.username) {
    errors.username = toast.error("email is requried");
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
  ) {
    errors.username = toast.error("invalid email address");
  }

  //password
  if (!values.password) {
    errors.password = toast.error("password is required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("wrong password");
  } else if (values.password.length < 8) {
    errors.password = toast.error("password atleast contain 8 characters");
  }

  return errors;
};
const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      axios
        .post(userLogin, values)
        .then((response) => {
          const { data } = response;
          console.log(response.data);
          dispatch(setLogin({ user: data.data, token: data.user_jwt }));
          navigate("/");
          console.log(data.data);

          toast.success("Login successful!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        })
        .catch((error) => {
          if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
           
            if (status >= 400 && status <= 500 || status === 401) {
              console.log(status,data,'0iijj0j0000000000000000000000');
              setError(data.message);
            }else {
            setError("Network Error");
          }
        }
        });
    },
  });
  const [error, setError] = useState("");

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className={styles.left}>
          <form
            method="POST"
            className={styles.form_container}
            onSubmit={formik.handleSubmit}
          >
            <h1>LOGIN</h1>
            <br />
            <input
              type="text"
              placeholder="Email"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
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
              Login
            </button>
          </form>
          <div style={{ paddingTop: "10px" }} id="signdiv"></div>
          <ToastContainer />
          <span className={styles.signupSpan}>
            Don't have an account? <Link to="/signup">Signup</Link>
          </span>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup" className={styles.link}>
            Create an account? click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
