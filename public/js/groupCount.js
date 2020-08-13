const incrementGC = async function() {
   try {
      const result = await axios({
      method: "PATCH",
      url: `/api/v1/users/5f1ec89d3b127343185a7eba`,
      data: {
         $inc: { groupCount: 1 },
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
   } catch (err) {}
};