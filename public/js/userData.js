const passvaluex = async (data) => {
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
      url: "/api/v1/users/updateMe",
      data,
    });
    if (result.data.status === "success") {
      // alert("login successful");
      showAlert("success", "Settings updated");
      location.reload(true);
    }
    // console.log(result);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.getElementById("form-user-data").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append("name", document.getElementById("name").value);
  form.append("email", document.getElementById("email").value);
  form.append("photo", document.getElementById("photo").files[0]);
  console.log(form);
  passvaluex(form);
});
