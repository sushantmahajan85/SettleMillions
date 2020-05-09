// console.log('hey there');
//const Deal = require('./../../schema/models/dealModel');

const passvalueR = async function () {
    console.log('hey there');

    var url = window.location.pathname;
    var id = "123";//url.substring(url.lastIndexOf('/') + 1);
    console.log(url);
    //const deal = await Deal.findById(id);

    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/report',
            data: {
                whichDeal: "5e920424a48349272cb76af9",
                whoReported: "5ea433189f42469b40c70695"
            }
        });
        if (result.data.status === 'success') {
            alert('reported');
            console.log('reported')
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
// document.getElementById('report_btn').addEventListener('click', e => {
//     e.preventDefault();

//     // const dealName = document.getElementById('dealName').value;
//     // const affiliateLink = document.getElementById('affiliateLink').value;
//     // const category = document.getElementById('category').value;
//     // const company = document.getElementById('company').value;
//     // const mrp = document.getElementById('mrp').value;
//     // const dealPrice = document.getElementById('dealPrice').value;
//     passvalueR();
// })