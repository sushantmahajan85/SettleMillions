// console.log('hey there');

const passvalueo = async function() {
  console.log("hey there");
  var full_url = window.location.pathname;
  // var full_url = document.URL; // Get current url
  var url_array = full_url.split("/"); // Split the string into an array with / as separator
  var last_segment = url_array[url_array.length - 3]; // Get the last part of the array (-1)
  // alert(last_segment);
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/likedDeal",
      data: {
        deal: last_segment,
      },
    });
    if (result.data.status === "success") {
      alert("liked");
      console.log("liked");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};

// var url = 'http://www.site.com/234234234';
// var id = url.substring(url.lastIndexOf('/') + 1);
// alert(id);
document.getElementById("like_deal").addEventListener("click", (e) => {
  e.preventDefault();

  // const dealName = document.getElementById('dealName').value;
  // const affiliateLink = document.getElementById('affiliateLink').value;
  // const category = document.getElementById('category').value;
  // const company = document.getElementById('company').value;
  // const mrp = document.getElementById('mrp').value;
  // const dealPrice = document.getElementById('dealPrice').value;
  passvalueo();
});
