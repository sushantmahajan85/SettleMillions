// console.log('hey there');
//const Deal = require('./../../schema/models/dealModel');
const passvaluePa = async function(dealId, report) {
    console.log("hey there");
  
    try {
      const result = await axios({
        method: "PATCH",
        url: `/api/v1/deals/${dealId}`,
        data: {
          $inc: { reportCount: 1 },
        },
      });
      if (result.data.status === "success") {
        //alert("inc");
        console.log("inc");
        // window.setTimeout(() => {
        //     location.assign('/');
        // }, 1000);
        //el.form.submit();
      }
    } catch (err) {
      console.log(err);
    }
  };


const passvalueR = async function (dealId,userId,count) {
    console.log('hey there');

    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/report',
            data: {
                whichDeal: dealId,
                whoReported: userId
            }
        });
        if (result.data.status === 'success') {
            alert('Report Successful');
            console.log('reported');
            // window.setTimeout(() => {
            //     location.assign('/');
            // }, 1000);
            //el.form.submit();
            passvaluePa(dealId,count);
        }

    } catch (err) {
        alert('Report Successful');
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