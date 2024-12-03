import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../css/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registrationValidation } from "../helpers/Validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { convertFile } from "../helpers/convert";
export default function Register() {
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registrationValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  let [file, setFile] = useState();
  const onUpload = async (e) => {
    const base64 = await convertFile(e.target.files[0]);
    setFile(base64);
  };
  let [showPassword, setShowPassword] = useState(false);
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex-col items-center">
            <h1 className="text-5xl font-bold text-center mt-5">Register</h1>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className={styles.profile_Img}
                  src={file || avatar}
                  alt="avatar"
                />
              </label>

              <input
                type="file"
                name="profile"
                id="profile"
                onChange={onUpload}
              />
            </div>

            <div className="textbox flex flex-col items-center">
              <div className="relative w-full mb-2">
                <input
                  {...formik.getFieldProps("email")}
                  className={styles.textbox}
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="relative w-full mb-2">
                <input
                  {...formik.getFieldProps("username")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="relative w-full mb-2">
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-indigo-500 cursor-pointer"
                  onClick={() => {
                    showPassword
                      ? setShowPassword(false)
                      : setShowPassword(true);
                  }}
                />
              </div>
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already registered?
                <Link className="text-red-500" to="/login">
                  Login now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
