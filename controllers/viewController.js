const Deal = require("./../schema/models/dealModel");
const Subscriber = require("./../schema/models/subscriberModel");
const LikedDeal = require("./../schema/models/likedDealModel");
const User = require("./../schema/models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const exec = require("child_process").exec;
const url = require("url");
let cookieCount = 0;
let cookieArray = ["one", "two", "three", "four", "five"];
let cookieOneDealId = "";
let cookieTwoDealId = "";
let cookieThreeDealId = "";
let cookieFourDealId = "";
let cookieFiveDealId = "";
let rec = "";
let rec1 = "";
let rec2 = "";
let rec3 = "";
let rec4 = "";
let rec5 = "";

exports.getLoginForm = (req, res) => {
  res.status(200).render("login");
};

exports.getSignupForm = (req, res) => {
  res.status(200).render("signup");
};

exports.getLikedDeals = catchAsync(async (req, res) => {
  const user = await User.findById(req.user).populate({
    path: "likedDeals",
  });
  res.status(200).render("likedDeals", { user });
});

exports.getSubscriptions = catchAsync(async (req, res) => {
  const xyz = await User.findById(req.user).populate({
    path: "subscribers",
  });
  //console.log(xyz.subscribers);

  // for (var i = 0; i <= xyz.subscribers.length; i++) {

  // xyz.subscribers[i].subscribedUser
  // const final = function () {
  //     xyz.subscribers.forEach(async function (el) {
  //         const test = await el.subscribedUser._id;
  //         console.log(test);
  //         return test;
  //     }
  //     )
  // };
  // console.log(a);
  // }

  const subs = await Subscriber.find({ user: req.user }).populate({
    path: "subscribedDeals",
  });

  // console.log(subs[0].subscribedDeals);
  //console.log(subs[0].subscribedDeals.length);
  // for (var i = 0; i < xyz.subscribers.length; i++) {
  // const deals = await Deal.find({ user: xyz.subscribers[i].subscribedUser._id });
  // const deals = await Deal.find({ user: xyz.subscribers.subscribedUser });
  // }
  // console.log(deals);
  res.status(200).render("subscriptions", {
    xyz,
    subs,
  });
});

exports.createNewDeal = (req, res) => {
  res.status(200).render("newDeal");
};

exports.getVerificationForm = (req, res) => {
  res.status(200).render("verification");
};

exports.getRecruitmentsData = (req, res) => {
  res.status(200).render("recruitments");
};

exports.autocomplete = catchAsync(async (req, res) => {
  const regex = new RegExp(req.query["term"], "i");
  const query = Deal.find(
    { dealName: regex },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });
  //   const query = await Deal.find(
  //     { $text: { $search: req.query.search } },
  //     { score: { $meta: "textScore" } }
  //   ).sort({ score: { $meta: "textScore" } });

  // Execute query in a callback and return users list
  query.exec(function(err, users) {
    if (!err) {
      // Method to construct the json result set
      res.send(
        users,
        {
          "Content-Type": "application/json",
        },
        200
      );
    } else {
      res.send(
        JSON.stringify(err),
        {
          "Content-Type": "application/json",
        },
        404
      );
    }
  });
});

exports.mainPage = catchAsync(async (req, res) => {
  if (req.query.dealOps) {
    let joChahiye = req.query.dealOps.split("/");
    console.log(joChahiye[1]);

    if (joChahiye[1] == "report") {
      await Deal.findOneAndUpdate(
        { _id: joChahiye[0] },
        { $inc: { reportCount: 1 } }
      );
    }

    if (joChahiye[1] == "delete") {
      await Deal.findOneAndDelete({ _id: joChahiye[0] });
    }
  }

  let cooCount = 0;

  if (req.cookies.one !== undefined) {
    cooCount++;
    rec1 =
      req.cookies.one.dealName +
      " " +
      req.cookies.one.titleDis +
      " " +
      req.cookies.one.owner +
      " " +
      req.cookies.one.company +
      " " +
      req.cookies.one.category +
      " " +
      req.cookies.one.user;
    if (req.cookies.one.tags) {
      for (var i = 0; i < Object.keys(req.cookies.one.tags).length; i++) {
        rec1 = rec1 + " " + req.cookies.one.tags[i];
      }
    }
  }
  //console.log(Object.keys(req.cookies.one.tags).length);
  if (req.cookies.two !== undefined) {
    cooCount++;
    rec2 =
      req.cookies.two.dealName +
      " " +
      req.cookies.two.titleDis +
      " " +
      req.cookies.two.owner +
      " " +
      req.cookies.two.company +
      " " +
      req.cookies.two.category +
      " " +
      req.cookies.two.user;
    if (req.cookies.two.tags) {
      for (var i = 0; i < Object.keys(req.cookies.two.tags).length; i++) {
        rec2 = rec2 + " " + req.cookies.two.tags[i];
      }
    }
  }
  if (req.cookies.three !== undefined) {
    cooCount++;
    rec3 =
      req.cookies.three.dealName +
      " " +
      req.cookies.three.titleDis +
      " " +
      req.cookies.three.owner +
      " " +
      req.cookies.three.company +
      " " +
      req.cookies.three.category +
      " " +
      req.cookies.three.user;
    if (req.cookies.three.tags) {
      for (var i = 0; i < Object.keys(req.cookies.three.tags).length; i++) {
        rec3 = rec3 + " " + req.cookies.three.tags[i];
      }
    }
  }
  if (req.cookies.four !== undefined) {
    cooCount++;
    rec4 =
      req.cookies.four.dealName +
      " " +
      req.cookies.four.titleDis +
      " " +
      req.cookies.four.owner +
      " " +
      req.cookies.four.company +
      " " +
      req.cookies.four.category +
      " " +
      req.cookies.four.user;
    if (req.cookies.four.tags) {
      for (var i = 0; i < Object.keys(req.cookies.four.tags).length; i++) {
        rec4 = rec4 + " " + req.cookies.four.tags[i];
      }
    }
  }
  if (req.cookies.five !== undefined) {
    cooCount++;
    rec5 =
      req.cookies.five.dealName +
      " " +
      req.cookies.five.titleDis +
      " " +
      req.cookies.five.owner +
      " " +
      req.cookies.five.company +
      " " +
      req.cookies.five.category +
      " " +
      req.cookies.five.user;
    if (req.cookies.five.tags) {
      for (var i = 0; i < Object.keys(req.cookies.five.tags).length; i++) {
        rec5 = rec5 + " " + req.cookies.five.tags[i];
      }
    }
  }

  rec = rec1 + " " + rec2 + " " + rec3 + " " + rec4 + " " + rec5;

  //console.log(rec);

  const recommendedDeals = await Deal.find(
    { $text: { $search: rec } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });

  for (var i = 0; i < cooCount; i++) {
    recommendedDeals[i] = undefined;
  }
  // console.log(recommendedDeals);
  if (req.query.search) {
    // await Deal.ensureIndexes({ dealName: 'text' });

    //console.log(req.query.search);
    // var regex = new RegExp(req.query["term"], "i");

    const deals = await Deal.find(
      { $text: { $search: req.query.search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // const user = await User.findById(req.user.id);
    // console.log(user);
    // const regex = new RegExp(escapeRegex(req.query.search), "gi");
    // var result = [];
    // await Deal.find({
    //   dealName: regex,
    //   // owner: regex,
    // }).then((usrs) => {
    //   if (usrs && usrs.length && usrs.length > 0) {
    //     usrs.forEach((user) => {
    //       let obj = {
    //         id: user._id,
    //         label: user.dealName,
    //       };

    //       result.push(obj);
    //     });
    //   }
    //   res.json(result);
    // });
    // //console.log(deals);
    res.status(200).render("search", { deals /*recommendedDeals*/ });
  } else {
    let sortBy = "views";
    let order = -1;
    if (req.query.sort === "mrp") {
      sortBy = "" + req.query.sort;
      order = 1;
    }
    if (req.query.sort === "views") {
      sortBy = "" + req.query.sort;
      order = -1;
    }
    // const user = await User.findById(req.user);
    const deals = await Deal.find().sort([[`${sortBy}`, order]]);
    const liveDeals = await Deal.find().sort([["time", -1]]);

    res
      .status(200)
      .render("main", { deals, recommendedDeals, liveDeals, cooCount });
  }
});

exports.getMemberData = catchAsync(async (req, res) => {
  if (req.query.dealOps) {
    let joChahiye = req.query.dealOps.split("/");
    console.log(joChahiye[1]);

    if (joChahiye[1] == "report") {
      await Deal.findOneAndUpdate(
        { _id: joChahiye[0] },
        { $inc: { reportCount: 1 } }
      );
    }

    if (joChahiye[1] == "delete") {
      await Deal.findOneAndDelete({ _id: joChahiye[0] });
    }
  }

  const deals = await Deal.find({ user: req.params.id });

  res.status(200).render("members", {
    deals,
  });
});

exports.recently = catchAsync(async (req, res) => {
  const deals = req.cookies;
  console.log(deals.one);
  res.status(200).render("recent", {
    deals,
  });
});

exports.updateUserSettings = catchAsync(async (req, res) => {
  const user = await User.findById(req.user);
  // const xyz = await User.findById(req.user).populate({
  //   path: "subscribers",
  // });
  console.log(user);
  res.status(200).render("updateSettings", { user });
});

exports.dealPage = catchAsync(async (req, res, next) => {
  // console.log(req.cookies);

  await Deal.findOneAndUpdate(
    { _id: req.params.dealId },
    { $inc: { views: 1 } }
  );
  // var full_url = req.url;
  // // var full_url = document.URL; // Get current url
  // var url_array = full_url.split("/"); // Split the string into an array with / as separator
  // var last_segment = url_array[url_array.length - 1]; // Get the last part of the array (-1)
  // var last = parseInt(last_segment);
  const xyz = await User.findById(req.logged.id);
  // console.log(xyz);
  if (xyz) {
    const likeModel = await LikedDeal.findOneAndDelete({
      deal: req.params.dealId,
      user: xyz._id,
    });
    console.log(likeModel);
    res.locals.like = likeModel;
  } else {
    res.locals.like = null;
  }

  if (xyz) {
    const subModel = await Subscriber.findOneAndDelete({
      subscribedUser: req.params.sellerId,
      user: xyz._id,
    });
    // console.log(subModel);
    res.locals.log = subModel;
  } else {
    res.locals.log = null;
  }

  // console.log(submodel);
  // if (!subModel) {
  //   return next();
  // }
  // if (subModel.user._id == req.user.id) {
  //   await Subscriber.findByIdAndDelete(req.params.id);
  // }
  const deal = await Deal.findById({ _id: req.params.dealId }).populate({
    path: "reviews",
  });

  if (!deal) {
    return next(new AppError("No Deal With That Id", 404));
  }

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  if (cookieCount === 5) {
    req.cookies.five = req.cookies.four;
    req.cookies.four = req.cookies.three;
    req.cookies.three = req.cookies.two;
    req.cookies.two = req.cookies.one;
    cookieCount = 0;
  }

  let dealId = "affiliate" + deal._id;

  if (req.cookies.one === undefined) {
    cookieOneDealId = "affiliate";
  } else {
    cookieOneDealId = "affiliate" + req.cookies.one._id;
  }

  if (req.cookies.two === undefined) {
    cookieTwoDealId = "affiliate";
  } else {
    cookieTwoDealId = "affiliate" + req.cookies.two._id;
  }

  if (req.cookies.three === undefined) {
    cookieThreeDealId = "affiliate";
  } else {
    cookieThreeDealId = "affiliate" + req.cookies.three._id;
  }

  if (req.cookies.four === undefined) {
    cookieFourDealId = "affiliate";
  } else {
    cookieFourDealId = "affiliate" + req.cookies.four._id;
  }

  if (req.cookies.five === undefined) {
    cookieFiveDealId = "affiliate";
  } else {
    cookieFiveDealId = "affiliate" + req.cookies.five._id;
  }

  if (
    cookieOneDealId !== dealId &&
    cookieTwoDealId !== dealId &&
    cookieThreeDealId !== dealId &&
    cookieFourDealId !== dealId &&
    cookieFiveDealId !== dealId
  ) {
    res.cookie(cookieArray[cookieCount], deal, cookieOptions);
    cookieCount++;
  }

  //console.log(dealId);

  res.status(200).render("deal", {
    deal,
  });
});
// function escapeRegex(text) {
//   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// }
