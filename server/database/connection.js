import mongoose from "mongoose";

async function connect() {
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/loginSystem");

  console.log("Database connected");

  return db;
}

export default connect;
