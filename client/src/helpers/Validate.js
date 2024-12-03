import { toast } from "react-hot-toast";

export async function usernameValidate(values) {
  const errors = username({}, values);
  return errors;
}

export async function resetPassword(values) {
  const error = password({}, values);

  if (values.password !== values.confirmPassword) {
    error.exist = toast.error("password does not match...!");
  }
  return error;
}

export async function passwordValidate(values) {
  const errors = password({}, values);
  return errors;
}

export async function registrationValidation(values) {
  const errors = username({}, values);
  password(errors, values);
  email(errors, values);
  return errors;
}

export async function profileValidation(values) {
  const errors = email({}, values);
  return errors;
}

let password = (error = {}, values) => {
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 8) {
    error.password = toast.error(
      "Password must be more than 8 characters long...!"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must contain special character...!");
  }
  return error;
};

let username = (error = {}, values) => {
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid User");
  }

  return error;
};

let email = (error = {}, values) => {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email === " ") {
    error.email = toast.error("Wrong email");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address.!");
  }

  return error;
};
