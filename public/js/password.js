const passvaluey = async (current, npassword, cpassword) => {
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
    const result = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateMyPassword",
      data: {
        passwordCurrent: current,
        password: npassword,
        passwordConfirm: cpassword,
      },
    });
    if (result.data.status === "success") {
      // alert("login successful");
      showAlert("success", "New password successfully set");
      window.setTimeout(() => {
        location.assign("/subscriptions");
      }, 1000);
    }
    // console.log(result);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.getElementById("pass").addEventListener("submit", (e) => {
  e.preventDefault();
  const current = document.getElementById("current").value;
  const npassword = document.getElementById("npassword").value;
  const cpassword = document.getElementById("cpassword").value;
  passvaluey(current, npassword, cpassword);
});
