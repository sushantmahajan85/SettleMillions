const passvalue = async (name, email, phoneNo, password) => {
    try {
        await axios({
            method: 'DELETE',
            url: 'http://127.0.0.1:7000/api/v1/users/signup',
            data: {
                email
            }
        });
        const result = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:7000/api/v1/users/signup',
            data: {
                email,
                phoneNo,
                name,
                password
            }
        });
        if (result.data.status === 'success') {
            alert('sign up successful');
            window.setTimeout(() => {
                location.assign('/verification');
            }, 1000);
        }

    } catch (err) {
        console.log(err);
    }
};


document.getElementById('login100-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const password = document.getElementById('password').value;
    passvalue(name, email, phoneNo, password);
})