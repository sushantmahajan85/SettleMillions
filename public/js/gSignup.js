function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    alert(profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log(profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    console.log(profile.getEmail()); // This is null if the 'email' scope is not present.
}