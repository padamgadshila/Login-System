import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../css/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPassword } from "../helpers/Validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
export default function Reset() {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetPassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  let [CreatePassword, setCreatePassword] = useState(false);
  let [ConfirmPassword, setConfirmPassword] = useState(false);

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ paddingBottom: "10px" }}>
          <div className="title flex flex-col items-center">
            <h1 className="text-5xl font-bold text-center mt-5">Reset</h1>
            <span className="py-4 text-xl my-2 w-full text-center text-gray-500">
              Enter new password
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center">
              <div className="relative w-full mb-2">
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type={CreatePassword ? "text" : "password"}
                  placeholder="Create password"
                />

                <FontAwesomeIcon
                  icon={CreatePassword ? faEyeSlash : faEye}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-indigo-500 cursor-pointer"
                  onClick={() => {
                    CreatePassword
                      ? setCreatePassword(false)
                      : setCreatePassword(true);
                  }}
                />
              </div>
              <div className="relative w-full mb-2">
                <input
                  {...formik.getFieldProps("confirmPassword")}
                  className={styles.textbox}
                  type={ConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                />
                <FontAwesomeIcon
                  icon={ConfirmPassword ? faEyeSlash : faEye}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-indigo-500 cursor-pointer"
                  onClick={() => {
                    ConfirmPassword
                      ? setConfirmPassword(false)
                      : setConfirmPassword(true);
                  }}
                />
              </div>

              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
