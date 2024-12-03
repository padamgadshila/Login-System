import styles from "../css/Username.module.css";
import { Toaster } from "react-hot-toast";

export default function Recovery() {
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex-col items-center">
            <h1 className="text-5xl font-bold text-center mt-5">Recovery</h1>
            <span className=" py-4 text-md my-2 w-2/3 text-center text-gray-500">
              Enter OTP to recovery password.
            </span>
          </div>
          <form className="py-1">
            <div className="textbox flex flex-col items-center">
              <span className="text-center  text-gray-500 mt-10">
                Enter 6 digit OTP send to your email address.
              </span>
              <input className={styles.textbox} type="text" placeholder="OTP" />
              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OPT?
                <button className="text-red-500">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
