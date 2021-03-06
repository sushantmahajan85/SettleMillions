// import { showAlert } from "./alerts";

const passvaluePage = async (titleDescript, descript, link) => {
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
      method: "POST",
      url: "/api/v1/deals/pageDeal",
      data: {
        titleDescript,
        descript,
        link,
      },
    });
    if (result.data.status === "success") {
      showAlert("success", "Successfully posted");
      //   alert("successful");
      window.setTimeout(() => {
        location.assign("/");
      }, 800);
    }
    // console.log(request.data);
  } catch (err) {
    showAlert("error", "Something went wrong");
  }
};

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("cpassword").value;
  const descript = document.getElementById("password").value;
  const pageLink = document.getElementById("pageLink").value;
  passvaluePage(title, descript, pageLink);
});
