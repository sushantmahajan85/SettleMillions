// console.log('hey there');
//const Deal = require('./../../schema/models/dealModel');
const passvaluePa = async function(dealId, report) {
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

  try {
    const result = await axios({
      method: "PATCH",
      url: `/api/v1/deals/${dealId}`,
      data: {
        $inc: { reportCount: 1 },
      },
    });
    if (result.data.status === "success") {
      //alert("inc");
      console.log("inc");
      // window.setTimeout(() => {
      //     location.assign('/');
      // }, 1000);
      //el.form.submit();
    }
  } catch (err) {}
};

const passvalueR = async function(dealId, userId, count) {
  console.log("hey there");

  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/report",
      data: {
        whichDeal: dealId,
        whoReported: userId,
      },
    });
    if (result.data.status === "success") {
      // alert("Report Successful");
      console.log("reported");

      showAlert("success", "Reported successfully");
      // window.setTimeout(() => {
      //     location.assign('/');
      // }, 1000);
      //el.form.submit();
      passvaluePa(dealId, count);
    }
  } catch (err) {
    // alert("Report Successful");
    // console.log(err);

    showAlert("success", "Reported successfully");
    // showAlert("error", err.response.data.message);
  }
};

// var url = 'http://www.site.com/234234234';
// var id = url.substring(url.lastIndexOf('/') + 1);
// alert(id);
// document.getElementById('report_btn').addEventListener('click', e => {
//     e.preventDefault();

//     // const dealName = document.getElementById('dealName').value;
//     // const affiliateLink = document.getElementById('affiliateLink').value;
//     // const category = document.getElementById('category').value;
//     // const company = document.getElementById('company').value;
//     // const mrp = document.getElementById('mrp').value;
//     // const dealPrice = document.getElementById('dealPrice').value;
//     passvalueR();
// })
