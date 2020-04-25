const passvaluey = async (current, npassword, cpassword) => {
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
      alert("login successful");
      window.setTimeout(() => {
        location.assign("/subscriptions");
      }, 1000);
    }
    // console.log(result);
  } catch (err) {
    console.log(err.response.data);
  }
};

document.getElementById("pass").addEventListener("submit", (e) => {
  e.preventDefault();
  const current = document.getElementById("current").value;
  const npassword = document.getElementById("npassword").value;
  const cpassword = document.getElementById("cpassword").value;
  passvaluey(current, npassword, cpassword);
});
