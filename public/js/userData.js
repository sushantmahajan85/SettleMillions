const passvaluex = async (email, name, photo) => {
  try {
    const result = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateMe",
      data: {
        email,
        name,
        photo,
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

document.getElementById("form-user-data").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const photo = document.getElementById("photo").value;
  passvaluex(email, name, photo);
});
