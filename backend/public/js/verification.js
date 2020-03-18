const passvalue = async (verification_token) => {
    try {
        const result = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:4000/api/v1/users/verify',
            data: {
                verification_token
            }
        });
        if (result.data.status === 'success') {
            alert('sign up successful');
            window.setTimeout(() => {
                location.assign('/recruitments');
            }, 1000);
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};


document.getElementById('login100-form').addEventListener('submit', e => {
    e.preventDefault();
    const verification_token = document.getElementById('verification_token').value;
    passvalue(verification_token);
})