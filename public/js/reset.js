const passvalueReset = async (password, passwordConfirm) => {
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
  var last_segment = url_array[url_array.length - 1]; // Get the last part of the array (-1)

  try {
    // await axios({
    //   method: "DELETE",
    //   url: "/api/v1/users/signup",
    //   data: {
    //     email,
    //   },
    // });

    const result = await axios({
      method: "PATCH",

      url: `/api/v1/users/resetPassword/${last_segment}`,
      data: {
        password,
        passwordConfirm,
      },
    });
    if (result.data.status === "success") {
      // alert("sign up successful");
      showAlert("success", "New Password set successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 2000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.getElementById("signup_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;
  console.log(password);
  const passwordConfirm = document.getElementById("cpassword").value;
  console.log(passwordConfirm);
  passvalueReset(password, passwordConfirm);
});
