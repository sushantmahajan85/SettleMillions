// console.log('hey there');
const Deal = require("/../schema/models/dealModel");
// import { Deal } from './../../schema/models/dealModel';
const passvalue3 = async function() {
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
  console.log("hey there");

  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf("/") + 1);

  const deal = await Deal.findById({ id });
  console.log(deal);
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/subscribe",
      data: {
        subscribedUser: id,
      },
    });
    if (result.data.status === "success") {
      //   alert("subscribed");
      showAlert("success", "Subscribed");
      console.log("subscribed");
      // window.setTimeout(() => {
      //   location.assign("/");
      // }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

// var url = 'http://www.site.com/234234234';
// var id = url.substring(url.lastIndexOf('/') + 1);
// alert(id);
document.getElementById("subscribe").addEventListener("click", (e) => {
  e.preventDefault();

  // const dealName = document.getElementById('dealName').value;
  // const affiliateLink = document.getElementById('affiliateLink').value;
  // const category = document.getElementById('category').value;
  // const company = document.getElementById('company').value;
  // const mrp = document.getElementById('mrp').value;
  // const dealPrice = document.getElementById('dealPrice').value;
  passvalue3();
});
