// import { showAlert } from "./alerts";

const passvalueNews = async (titleDescript, descript,link) => {
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
        url: "/api/v1/deals/newsDeal",
        data: {
          titleDescript,
    descript,
    link
        },
      });
      if (result.data.status === "success") {
        showAlert("success", "News Successfully Posted!");
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
    console.log("wow");
    const title = document.getElementById("cpassword").value;
    const descrip = document.getElementById("password").value;
    const newsLink = document.getElementById("newsLink").value;
    passvalueNews(title, descrip,newsLink);
  });
  