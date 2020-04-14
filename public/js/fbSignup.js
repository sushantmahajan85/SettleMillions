// FB.getLoginStatus(function(response) {
//    statusChangeCallback(response);
//    console.log(response);
// });

// FB.login(function(response) {
//    if (response.status === 'connected') {

//    } else {
//       // The person is not logged into your webpage or we are unable to tell. 
//     } }, {scope: 'public_profile, email'});

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

// window.fbAsyncInit = function() {
//    FB.init({
//        appId      : '1321461864731329',
//        cookie     : true,
//        xfbml      : true,
//        version    : 'v6.0'
//    });



//    FB.AppEvents.logPageView();  

//    };

//    (function(d, s, id){
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {return;}
//    js = d.createElement(s); js.id = id;
//    js.src = "https://connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));



// function checkLoginState() {
//    FB.getLoginStatus(function(response) {
//        statusChangeCallback(response);
//    });
// }

// function statusChangeCallback(response) {
//    if(response.status === 'connected'){
//       console.log('Logged In');
//    }else{
//       console.log('Not Logged In')
//    }
// }

// let fbName;
// let fbEmail;

// function testAPI(){
//    FB.api('/me?fields=name,email', function(response){
//       if(response && !response.error){
//          console.log(response);
//          fbName = response.name;
//          fbEmail = response.email;
//       }
//    });
// }

//    const name = fbName;
//    const email = fbEmail;
//    const password = 'password';
//    const passwordConfirm = 'password';
//    passvaluefb(name, email, password, passwordConfirm);

//    // FB.logout(function(response) {
//    //    // Person is now logged out
//    // });
