const passvalue = async (name, email, password, passwordConfirm) => {
    try {
        await axios({
            method: 'DELETE',
            url: '/api/v1/users/signup',
            data: {
                email
            }
        });
        const result = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                email,
                name,
                password,
                passwordConfirm
            }
        });
        if (result.data.status === 'success') {
            alert('sign up successful');
            window.setTimeout(() => {
                location.assign('/verification');
            }, 1000);
        }

    } catch (err) {
        // console.log(err);
    }
};


document.getElementById('login100-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    //const phoneNo = document.getElementById('phoneNo').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password_confirm').value;
    passvalue(name, email, password, passwordConfirm);
})