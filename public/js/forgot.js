const passvalueForgot = async (email) => {
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
      alert("sign up successful");
      window.setTimeout(() => {
        location.assign("/");
      }, 2000);
    }
  } catch (err) {
    // console.log(err);
  }
};

document.getElementById("signup_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  passvalueForgot(email);
});
