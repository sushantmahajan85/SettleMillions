// import { showAlert } from "./alerts";

const passvaluePage = async (titleDescript, descript) => {
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
        },
      });
      if (result.data.status === "success") {
        showAlert("success", "login successful");
        //   alert("successful");
        window.setTimeout(() => {
          location.assign("/");
        }, 800);
      }
      // console.log(request.data);
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };
  
  document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("cpassword").value;
    const descript = document.getElementById("password").value;
    passvaluePage(title, descript);
  });
  