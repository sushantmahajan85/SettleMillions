// console.log('hey there');

const passvalueo = async function (dealId, whoLiked) {
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
  var full_url = window.location.pathname;
  // var full_url = document.URL; // Get current url
  var url_array = full_url.split("/"); // Split the string into an array with / as separator
  var last_segment = url_array[url_array.length - 3];
  console.log(last_segment); // Get the last part of the array (-1)
  // alert(last_segment);
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/likedDeal",
      data: {
        deal: last_segment,
        //user: whoLiked
      },
    });
    if (result.data.status === "success") {
      // alert("liked");
      showAlert("success", "Saved For Later!");
      //alert("liked");
      console.log("Saved For Later!");
      // window.setTimeout(() => {
      //   location.assign("/");
      // }, 1000);
    }
  } catch (err) {
    showAlert("error", "Something went wrong");
  }
};

// var url = 'http://www.site.com/234234234';
// var id = url.substring(url.lastIndexOf('/') + 1);
// alert(id);

const passvalueunlike = async function (documentId) {
  console.log(documentId);
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
  console.log(url);
  //const deal = await Deal.findById(id);

  try {
    const result = await axios({
      method: "DELETE",
      url: `/api/v1/likedDeal/${documentId}`,
    });
    if (result.data.status === "success") {
      //   alert("subscribed");
      showAlert("success", "Unliked");
      console.log("subscribed");
      window.setTimeout(() => {
        location.assign(`${url}`);
      }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.getElementById("like_deal").addEventListener("click", (e) => {
  e.preventDefault();

  // const dealName = document.getElementById('dealName').value;
  // const affiliateLink = document.getElementById('affiliateLink').value;
  // const category = document.getElementById('category').value;
  // const company = document.getElementById('company').value;
  // const mrp = document.getElementById('mrp').value;
  // const dealPrice = document.getElementById('dealPrice').value;
  passvalueo();
});
