import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
export let authenticate = async (username) => {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "User not exist" };
  }
};

// get user details

export let getUser = async (username) => {
  try {
    const { data } = await axios.get(`/api/getUser${username}`);
    return { data };
  } catch (error) {
    return { error: "Error getting the users data" };
  }
};

// register user
export let register = async (data) => {
  try {
    const {
      data: { message },
      status,
    } = await axios.post(`/api/register/`, data);

    let { username, email } = data;

    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: message,
      });
    }

    return { message };
  } catch (error) {
    return { error: "something went wrong" };
  }
};

// login

export let verifyPassword = async ({ username, password }) => {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return { data };
    }
  } catch (error) {
    return { error };
  }
};

// update

export let updateUser = async (res) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.put("/api/updateUser", res, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    return { error };
  }
};

// gen otp

export let generateOTP = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });

    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `"Your otp is ${code}.`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery otp",
      });
    }
    return { code };
  } catch (error) {
    return { error };
  }
};

// verify otp

export let verifyOTP = async ({ username, code }) => {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return { error };
  }
};

// reset password

export let resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return { data, status };
  } catch (error) {
    return { error };
  }
};
