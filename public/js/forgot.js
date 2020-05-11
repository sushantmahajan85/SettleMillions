const passvalueForgot = async (email) => {
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

      url: "/api/v1/users/forgotPassword",
      data: {
        email,
      },
    });
    if (result.data.status === "success") {
      // alert("sign up successful");
      showAlert("success", "Email sent! Please check your email");
      // window.setTimeout(() => {
      //   location.assign("/");
      // }, 2000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.getElementById("signup_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  passvalueForgot(email);
});
