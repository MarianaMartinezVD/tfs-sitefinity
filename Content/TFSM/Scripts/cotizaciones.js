$(document).ready(async () => {
  let _data = {
    email: "gonzalo.castro@virtualdreams.io",
  };
  let _myHeader = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization:
      "Bearer 00D630000004s6r!AQYAQBMARlSs7xkfrpQQV4Yldk9d8Q_C4WmkqzPoFCsJ9QTrZreSpWr7AYSOkkHRhoy5CKPITfm_9ipd.3C9Xym2e86ZCvSg",
    "Access-Control-Allow-Credentials": true,
  };
  const settings = {
    method: "POST",
    headers: JSON.stringify(_myHeader),
    body: JSON.stringify(_data),
    //credentials: 'include',
    //mode: 'no-cors'
    error: (err) => console.log(err),
  };
  try {
    fetch(
      "https://webhook.site/b8c8e926-3c4c-4f44-bb7b-044cc8b349f0",
      settings
    )
    .then((data) => data.json())
    .then((res) => console.log(res))
    .catch(function (error) {
      console.log(error);
    });
    // const data = await fetchResponse.json();
    // console.log("Entró al try " + data);
    // return data;
  } catch (e) {
      console.log("Entró al catch: " + e);
    return e;
  }
});
