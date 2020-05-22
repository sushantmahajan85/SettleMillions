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
      url: "/logout",
    });

    showAlert("success", "Logged out");

    self.location.assign(location);
    window.onload = function() {
      alert(cooking);
      self.location.assign(location);
    };
    // self.location.assign(location);
    //   alert("successful");

    // console.log(request.data);
  } catch (err) {
    showAlert("error", "Error logging out! Try again");
  }
};

document.getElementById("logout").addEventListener("click", (e) => {
  e.preventDefault();
  passvalueOut();
});
