const passvaluefb = async (response) => {
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
    const name = response.name;
    const email = response.email;
    const password = "password";
    const passwordConfirm = "password";

    console.log(name, email, password, passwordConfirm);

    // const email = 'njkdhsgegdhdjd@j.com';

    const result = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        email,
        name,
        password,
        passwordConfirm,
      },
    });
    if (result.data.status === "success") {
      //   alert("sign up successful");
      showAlert("success", "signup successful");
      window.setTimeout(() => {
        location.assign("/");
      }, 800);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

// //    // FB.logout(function(response) {
// //    //    // Person is now logged out
// //    // });
//
