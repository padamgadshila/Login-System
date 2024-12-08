import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from "./router/route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use("/api", router);
const port = 8000;

app.get("/", (req, res) => {
  res.status(201).json("Home get request");
});

connect()
  .then(() => {
    try {
      app.listen(port, (err) => {
        if (err) throw err;
        console.log("Server started");
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log(error);
  });
