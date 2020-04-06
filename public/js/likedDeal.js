// console.log('hey there');

const passvalue = async function () {
    console.log('hey there');
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/likedDeal',
            data: {
                deal: id
            }
        });
        if (result.data.status === 'success') {
            alert('liked');
            console.log('liked')
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
document.getElementById('like_deal').addEventListener('click', e => {
    e.preventDefault();

    // const dealName = document.getElementById('dealName').value;
    // const affiliateLink = document.getElementById('affiliateLink').value;
    // const category = document.getElementById('category').value;
    // const company = document.getElementById('company').value;
    // const mrp = document.getElementById('mrp').value;
    // const dealPrice = document.getElementById('dealPrice').value;
    passvalue();
})