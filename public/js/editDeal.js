const passvalueEdit = async (data) => {
  const hideAlert = () => {
    const el = document.querySelector(".alerts");
    if (el) {
      el.parentElement.removeChild(el);
    }
  };

  const showAlert = (type, msg) => {
    hideAlert();

    const markup = `<div class="alerts alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);

    window.setTimeout(hideAlert, 5000);
  };
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf("/") + 1);
  try {
    const result = await axios({
      method: "PATCH",
      url: `/api/v1/deals/${id}`,
      data,
      //   dealName,
      //   affiliateLink,
      //   category,
      //   company,
      //   mrp,
      //   dealPrice,
    });
    if (result.data.status === "success") {
      // alert("deal created");
      showAlert("success", "Deal successfully Edited");
      window.setTimeout(() => {
        location.assign("/");
      }, 800);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

const passvalueEditReview = async (id, revrevrev) => {
  const hideAlert = () => {
    const el = document.querySelector(".alerts");
    if (el) {
      el.parentElement.removeChild(el);
    }
  };

  const showAlert = (type, msg) => {
    hideAlert();

    const markup = `<div class="alerts alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);

    window.setTimeout(hideAlert, 5000);
  };
  // var url = window.location.pathname;
  // var id = url.substring(url.lastIndexOf("/") + 1);
  try {
    const result = await axios({
      method: "PATCH",
      url: `/api/v1/reviews/${id}`,
      data:{
        review: revrevrev
      }
      //   dealName,
      //   affiliateLink,
      //   category,
      //   company,
      //   mrp,
      //   dealPrice,
    });
    if (result.data.status === "success") {
      // alert("deal created");
      showAlert("success", "Review successfully Edited");
      window.setTimeout(() => {
        location.reload();
      }, 800);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.getElementById("regForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append("dealName", document.getElementById("dealName").value);
  form.append("affiliateLink", document.getElementById("link").value);
  form.append("dealPrice", document.getElementById("fprice").value);
  form.append("mrp", document.getElementById("percent").value);
  form.append("category", document.getElementById("category").value);
  // form.append(
  //   "categorySelect",
  //   document.getElementById("categorySelect").value
  // );
  if (document.getElementById("photos").files[0]) {
    form.append("titleImg", document.getElementById("photos").files[0]);
  }
  if (document.getElementById("corousel1").files[0]) {
    form.append("corouselImgs", document.getElementById("corousel1").files[0]);
  }
  if (document.getElementById("corousel2").files[0]) {
    form.append("corouselImgs", document.getElementById("corousel2").files[0]);
  }
  if (document.getElementById("corousel3").files[0]) {
    form.append("corouselImgs", document.getElementById("corousel3").files[0]);
  }
  if (document.getElementById("corousel4").files[0]) {
    form.append("corouselImgs", document.getElementById("corousel4").files[0]);
  }

  // form.append("corousel", document.getElementById("corousel").files[0]);
  form.append("titleDis", document.getElementById("titleDis").value);
  form.append("biggerDis", document.getElementById("biggerDis").value);
  // form.append("tags", document.getElementById("tags").value);
  if (document.getElementById("tags").value) {
    var tags = JSON.parse(document.getElementById("tags").value);
    for (var key in tags) {
      form.append("tags", tags[key].value);
    }
  }

  // console.log(document.getElementById("photo").files[0]);
  // passvaluec(form);

  // const dealName = document.getElementById("dealName").value;
  // const affiliateLink = document.getElementById("link").value;
  // const category = document.getElementById("category").value;
  // // const company = document.getElementById("company").value;
  // const mrp = document.getElementById("percent").value;
  // const dealPrice = document.getElementById("fprice").value;
  passvalueEdit(form);
});
