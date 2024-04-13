const express = require("express");
const mongoose = require("mongoose");
const IndexRoutes = require("./routes/IndexRoutes");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: path.join(__dirname, "./.env") });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const allowedOrigins = ["https://dancing-faloodeh-a18570.netlify.app/"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/v1", IndexRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("Mongodb Connected.!!"))
  .catch((err) => console.log("Connecting Error ==>", err));

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server Start at ${process.env.PORT}`)
);
