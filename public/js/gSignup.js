async function onSignIn(googleUser) {
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
    const profile = googleUser.getBasicProfile();
    const gSignin = profile.getId(); // Do not send to your backend! Use an ID token instead.
    const name = profile.getName();
    // console.log('Image URL: ' + profile.getImageUrl());
    const email = profile.getEmail(); // This is null if the 'email' scope is not present.
    // const phone = '2278462878'
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        email,
        gSignin,
        name,
        password: "test1234",
        passwordConfirm: "test1234",
      },
    });
    if (result.data.status === "success") {
      // alert("sign up successful");
      showAlert("success", "Signup successful");
      window.setTimeout(() => {
        location.assign("/");
      }, 800);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
}
function signOut() {
  var auth2 = gapi.authAuthInstance();
  auth2.signOut().then(function() {
    alert("gsignout");
  });
}
