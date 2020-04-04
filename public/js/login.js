const passvalue = async (email, password) => {
    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        if (result.data.status === 'success') {
            alert('login successful');
            window.setTimeout(() => {
                location.assign('/likedDeals');
            }, 1000);
        }
        // console.log(result);
    } catch (err) {
        console.log(err.response.data);
    }
};


document.getElementById('login100-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    passvalue(email, password);
})