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
    body: JSON.stringify(_data),
    success: (data) => {
        console.log("success!!");
        console.log(data);
        
    },
    //credentials: 'include',
    //mode: 'no-cors'
    error: (err) => console.log(err),
    // url: "https://webhook.site/b8c8e926-3c4c-4f44-bb7b-044cc8b349f0",
    url: "https://toyotafinancial--salt001.my.salesforce.com/services/apexrest/sitefinity"
  };
  try {
    $.ajax(settings);
    // const data = await fetchResponse.json();
    // console.log("Entró al try " + data);
    // return data;
  } catch (e) {
      console.log("Entró al catch: " + e);
    return e;
  }
});
