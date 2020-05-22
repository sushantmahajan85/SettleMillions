const passvalueReview = async (review) => {
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
  var full_url = window.location.pathname;
  // var full_url = document.URL; // Get current url
  var url_array = full_url.split("/"); // Split the string into an array with / as separator
  var last_segment = url_array[url_array.length - 3]; // Get the last part of the array (-1)

  try {
    // await axios({
    //   method: "DELETE",
    //   url: "/api/v1/users/signup",
    //   data: {
    //     email,
    //   },
    // });

    const result = await axios({
      method: "POST",

      url: `/api/v1/deals/${last_segment}/reviews`,
      data: {
        review,
      },
    });
    if (result.data.status === "success") {
      // alert("sign up successful");
      showAlert("success", "Review posted");
      //   window.setTimeout(() => {
      //     location.assign("/login");
      //   }, 800);
      location.reload(true);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err);
  }
};

document.getElementById("review_post").addEventListener("click", (e) => {
  e.preventDefault();
  const review = document.getElementById("review_input").value;

  // const passwordConfirm = document.getElementById("cpassword").value;

  passvalueReview(review);
});
