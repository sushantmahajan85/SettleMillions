const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const url = require("url");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const spawn = require("child_process").spawn;

const processPython = spawn('python', ['./../model_creation.py']);

processPython.stdout.on('data', (data) => {
  console.log(`${data}`);
});

// processPython.stderr.on('data', (data) => {
//   console.log(`Error: ${data}`);
// });

// processPython.on('close', (data) => {
//   console.log(`${data}`);
// });

const appError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const dealRouter = require("./routes/dealRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const likedDealRouter = require("./routes/likedDealRoutes");
const subscriberRouter = require("./routes/subscribeRoutes");
const viewRouter = require("./routes/viewRoutes");
const reportRouter = require("./routes/reportRoutes");

const testingRouter = require("./routes/testRoutes");
const { json } = require("express");

//const authController = require("./controllers/authController");

const app = express();
app.use(express.json());
// let testy = "";

// app.use("/deal", (req, res, next) => {
//   var full_url = req.url;
//   // var full_url = document.URL; // Get current url
//   var url_array = full_url.split("/"); // Split the string into an array with / as separator
//   var last_segment = url_array[url_array.length - 3]; // Get the last part of the array (-1)
//   req.lasty = last_segment;
//   testy = "/deal/" + req.lasty;
//   console.log(testy);
//   next();
// });

const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: "<h1>too many request from this ip..try again in an hour</h1>",
});

app.use("/deal/", limiter);
// app.use("/api/v1/users", limiter);
// app.use("/api/v1/deals", limiter);
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

// app.use(globalErrorHandler);

app.use("/api/v1/report", reportRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/deals", dealRouter);

app.use("/", viewRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/likedDeal", likedDealRouter);
app.use("/api/v1/subscribe", subscriberRouter);
app.use("/api/v1/testing", testingRouter);
app.use("/", viewRouter);
app.all("*", (req, res, next) => {
  res.status(200).render('error');
});
// app.use(globalErrorHandler);
const port = process.env.PORT;
app.listen(port || 4000, () => {
  console.log("Listening bro");
});
