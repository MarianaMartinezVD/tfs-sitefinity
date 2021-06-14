$(document).ready(async () => {
  let _data = {
    email: "gonzalo.castro@virtualdreams.io",
  };
  let _myHeader = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    'Authorization':
      "Bearer 00D630000004s6r!AQYAQBMARlSs7xkfrpQQV4Yldk9d8Q_C4WmkqzPoFCsJ9QTrZreSpWr7AYSOkkHRhoy5CKPITfm_9ipd.3C9Xym2e86ZCvSg",
    "Access-Control-Allow-Credentials": true,
  };
  const settings = {
    method: "POST",
    headers: _myHeader,
    data: JSON.stringify(_data),
    success: (data) => {
        console.log("success!!");
        console.log(data);
        
    },
    error: (err) => console.log(err),
    url: "https://toyotafinancial--salt001.my.salesforce.com/services/apexrest/sitefinity"
  };
  try {
    $.ajax(settings);
  } catch (e) {
      console.log("Entró al catch: " + e);
    return e;
  }
});
