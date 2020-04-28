const passvaluex = async (data) => {
  try {
    const result = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateMe",
      data,
    });
    if (result.data.status === "success") {
      alert("login successful");
      window.setTimeout(() => {
        location.assign("/updateUserSettings");
      }, 1000);
    }
    // console.log(result);
  } catch (err) {
    console.log(err.response.data);
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
