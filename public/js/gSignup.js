async function onSignIn(googleUser) {
    try {
        const profile = googleUser.getBasicProfile();
        // alert(profile.getId()); // Do not send to your backend! Use an ID token instead.
        const name = profile.getName();
        // console.log('Image URL: ' + profile.getImageUrl());
        const email = profile.getEmail(); // This is null if the 'email' scope is not present.
        const result = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                email,
                name,
                password: 'test1234',
                passwordConfirm: 'test1234'
            }
        });
        if (result.data.status === 'success') {
            alert('sign up successful');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }

    } catch (err) {
        console.log(err);
    }
};





