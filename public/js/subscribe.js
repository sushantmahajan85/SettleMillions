// console.log('hey there');

const passvalue = async function () {
    console.log('hey there');

    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/users/:userId/subscriber',
            // data: {

            // }
        });
        if (result.data.status === 'success') {
            alert('subscribed');
            console.log('subscribed')
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }

    } catch (err) {
        console.log(err);
    }
};

// var url = 'http://www.site.com/234234234';
// var id = url.substring(url.lastIndexOf('/') + 1);
// alert(id);
document.getElementById('subscribe_btn').addEventListener('click', e => {
    e.preventDefault();

    // const dealName = document.getElementById('dealName').value;
    // const affiliateLink = document.getElementById('affiliateLink').value;
    // const category = document.getElementById('category').value;
    // const company = document.getElementById('company').value;
    // const mrp = document.getElementById('mrp').value;
    // const dealPrice = document.getElementById('dealPrice').value;
    passvalue();
})