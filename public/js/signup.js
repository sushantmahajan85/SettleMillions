const passvaluehaha = async (username, email, password, passwordConfirm) => {
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

      url: "/api/v1/users/signup",
      data: {
        email,
        name: username,
        password,
        passwordConfirm,
      },
    });
    if (result.data.status === "success") {
      // alert("sign up successful");
      showAlert("success", "Signup successful");
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
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  //const phoneNo = document.getElementById('phoneNo').value;
  const password = document.getElementById("password").value;
  console.log(password);
  const passwordConfirm = document.getElementById("cpassword").value;
  console.log(passwordConfirm);
  passvaluehaha(username, email, password, passwordConfirm);
});
