const passvaluec = async (data) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/deals",
      data,
      //   dealName,
      //   affiliateLink,
      //   category,
      //   company,
      //   mrp,
      //   dealPrice,
    });
    if (result.data.status === "success") {
      alert("deal created");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    // console.log(err);
  }
};

document.getElementById("regForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let form = new FormData();
  form.append("dealName", document.getElementById("dealName").value);
  form.append("affiliateLink", document.getElementById("link").value);
  form.append("dealPrice", document.getElementById("fprice").value);
  form.append("mrp", document.getElementById("percent").value);
  form.append("category", document.getElementById("category").value);
  // form.append(
  //   "categorySelect",
  //   document.getElementById("categorySelect").value
  // );
  if (document.getElementById("photos").files[0]) {
    form.append("photo", document.getElementById("photos").files[0].name);
  }
  // form.append("corousel", document.getElementById("corousel").files[0]);
  form.append("titleDis", document.getElementById("titleDis").value);
  form.append("biggerDis", document.getElementById("biggerDis").value);
  // form.append("tags", document.getElementById("tags").value);
  if (document.getElementById("tags").value) {
    var tags = JSON.parse(document.getElementById("tags").value);
    for (var key in tags) {
      form.append("tags", tags[key].value);
    }
  }

  console.log(document.getElementById("photo").files[0]);
  // passvaluec(form);

  // const dealName = document.getElementById("dealName").value;
  // const affiliateLink = document.getElementById("link").value;
  // const category = document.getElementById("category").value;
  // // const company = document.getElementById("company").value;
  // const mrp = document.getElementById("percent").value;
  // const dealPrice = document.getElementById("fprice").value;
  passvaluec(form);
});
