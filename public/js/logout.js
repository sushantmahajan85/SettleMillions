const passvalueOut = async () => {
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
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (result.data.status === "success") {
      showAlert("success", "Logged out");
      //   alert("successful");
      window.setTimeout(() => {
        location.assign("/login");
      }, 2000);
    }
    // console.log(request.data);
  } catch (err) {
    showAlert("error", "Error logging out! Try again");
  }
};

document.getElementById("logout").addEventListener("click", (e) => {
  e.preventDefault();
  passvalueOut();
});
