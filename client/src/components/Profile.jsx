import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../css/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helpers/Validate";
import { convertFile } from "../helpers/convert";

export default function Profile() {
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      mobile: "",
      email: "",
      address: "",
    },
    validate: profileValidation,
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
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex-col items-center">
            <h1 className="text-5xl font-bold text-center mt-5">Profile</h1>
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
              <div className="flex gap-2">
                <div className="relative w-full mb-2">
                  <input
                    {...formik.getFieldProps("fname")}
                    className={styles.textbox}
                    type="email"
                    placeholder="First name"
                  />
                </div>
                <div className="relative w-full mb-2">
                  <input
                    {...formik.getFieldProps("lname")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="relative w-full mb-2">
                  <input
                    {...formik.getFieldProps("mobile")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Mobile No"
                  />
                </div>
                <div className="relative w-full mb-2">
                  <input
                    {...formik.getFieldProps("email")}
                    className={styles.textbox}
                    type="text"
                    placeholder="email"
                  />
                </div>
              </div>
              <div className="relative w-full mb-2">
                <input
                  {...formik.getFieldProps("address")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Address"
                />
              </div>
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later?
                <Link className="text-red-500" to="/logout">
                  Log out
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
