const passvaluec = async (form) => {
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
  const form = new FormData();
  form.append("dealName", document.getElementById("dealName").value);
  form.append("link", document.getElementById("link").value);
  form.append("fprice", document.getElementById("fprice").value);
  form.append("percent", document.getElementById("percent").value);
  form.append("category", document.getElementById("category").value);
  form.append(
    "categorySelect",
    document.getElementById("categorySelect").value
  );
  form.append("photo", document.getElementById("photo").files[0]);
  form.append("corousel", document.getElementById("corousel").files[0]);
  form.append("titleDis", document.getElementById("titleDis").value);
  form.append("biggerDis", document.getElementById("biggerDis").value);
  form.append("tags", document.getElementById("tags").value);

  //   const dealName = document.getElementById("dealName").value;
  //   const affiliateLink = document.getElementById("affiliateLink").value;
  //   const category = document.getElementById("category").value;
  //   const company = document.getElementById("company").value;
  //   const mrp = document.getElementById("mrp").value;
  //   const dealPrice = document.getElementById("dealPrice").value;
  //   passvaluec(dealName, affiliateLink, category, company, mrp, dealPrice);
  passvaluec(form);
});
