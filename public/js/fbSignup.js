// const passvaluefb = async (name, email, password, passwordConfirm) => {
//    try {
//        const result = await axios({
//            method: 'POST',
//            url: '/api/v1/users/signup',
//            data: {
//                email,
//                name,
//                password,
//                passwordConfirm
//            }
//        });
//        if (result.data.status === 'success') {
//            alert('sign up successful');
//            window.setTimeout(() => {
//                location.assign('/');
//            }, 1000);
//        }

//    } catch (err) {
//        console.log(err);
//    }
// };


// //    // FB.logout(function(response) {
// //    //    // Person is now logged out
// //    // });
//