const passvalue = async (dealName, affiliateLink, category, company, mrp, dealPrice) => {
   try {
      const result = await axios({
         method: 'POST',
         url: '/api/v1/deals',
         data: {
            dealName, affiliateLink, category, company, mrp, dealPrice
         }
      });
      if (result.data.status === 'success') {
         alert('deal created');
         window.setTimeout(() => {
            location.assign('/');
         }, 1000);
      }

   } catch (err) {
      // console.log(err);
   }
};


document.getElementById('postADeal').addEventListener('submit', e => {
   e.preventDefault();
   const dealName = document.getElementById('dealName').value;
   const affiliateLink = document.getElementById('affiliateLink').value;
   const category = document.getElementById('category').value;
   const company = document.getElementById('company').value;
   const mrp = document.getElementById('mrp').value;
   const dealPrice = document.getElementById('dealPrice').value;
   passvalue(dealName, affiliateLink, category, company, mrp, dealPrice);
})