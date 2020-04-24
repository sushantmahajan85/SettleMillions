const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const url = require("url");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const dealRouter = require("./routes/dealRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const likedDealRouter = require("./routes/likedDealRoutes");
const subscriberRouter = require("./routes/subscribeRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();
app.use(express.json());

let segment_one; // Get the last part of the array (-1)
let segment_two; // Get the last part of the array (-1)
let segment_three;

const limiter = rateLimit({
  max: 3,
  windowMs: 60 * 60 * 1000,
  message: "too many request from this ip..try again in an hour",
});
app.use("/deal", limiter);
app.use("/api/v1/users", limiter);
app.use("/api/v1/deals", limiter);
app.use(compression());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!!!");
  });

app.use(cookieParser());
// app.use((req, res, next) => {
//     console.log(req.cookies);
//     next();
// });
app.use("/api/v1/users", userRouter);
app.use("/api/v1/deals", dealRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/likedDeal", likedDealRouter);
app.use("/api/v1/subscribe", subscriberRouter);
app.use("/", viewRouter);
const port = process.env.PORT;
app.listen(port || 4000, () => {
  console.log("Listening bro");
});
