$(document).ready(function () {
  const FloatLabel = (() => {
    // add active class
    const handleFocus = (e) => {
      const target = e.target;
      target.parentNode.classList.add("active");
      target.parentNode.classList.add("focus");

      var placeholder = target.getAttribute("data-placeholder");
      if (placeholder) {
        target.setAttribute("placeholder", placeholder);
      }
    };

    // remove active class
    const handleBlur = (e) => {
      const target = e.target;
      if (!target.value) {
        target.parentNode.classList.remove("active");
      }
      target.parentNode.classList.remove("focus");
      target.removeAttribute("placeholder");
    };

    // register events
    const bindEvents = (floatField) => {
      // const floatField = element.querySelector("input");
      floatField.addEventListener("focus", handleFocus);
      floatField.addEventListener("blur", handleBlur);
    };

    // get DOM elements
    const init = () => {
      const floatContainers = document.querySelectorAll(".float-container");

      floatContainers.forEach((element) => {
        let input = element.querySelector("input");
        let select = element.querySelector("select");

        if (input) {
          if (input.value) {
            element.classList.add("active");
          }

          bindEvents(input);
        }

        if (select) {
          if (select.value) {
            element.classList.add("active");
          }
          bindEvents(select);
        }
      });
    };

    return {
      init: init,
    };
  })();

  FloatLabel.init();

  function capitalize(str) {
    return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
  }

  $.ajax({
    type: "get",
    url: "https://www.tfsmpct.com.mx/ServicioTFSM/api/tfsm/getdealers",
    datatype: "json",
    success: function (data) {
      var select = $("#distributor");
      var results = data.results.sort(
        (a, b) =>
          function () {
            if (a.Dealer > b.Dealer) {
              return 1;
            } else if (a.Dealer < b.Dealer) {
              return -1;
            } else {
              return 0;
            }
          }
      );
      console.log(results);
      results.forEach((dealer) => {
        var option = document.createElement("option");
        option.id = dealer.IdDealer;
        option.value = dealer.IdDealer;
        option.innerHTML = capitalize(dealer.Dealer);
        select.append(option);
      });
    },
  });

  $("#distributor").select2();

  $("#submitPlan").click(function () {
    var form = {
      Plan: $("#planType").val(),
      Firstname: $("#name").val(),
      Lastname: $("#lastname").val(),
      Email: $("#email").val(),
      DealerId: $("#distributor").val(),
      Dealer: $("#distributor option:selected").html(),
      Phone: $("#phone").val(),
    };

    $.ajax({
      type: "post",
      url:
        "https://www.tfs-sitefinity.virtualdreams.io/ServicioTFSM/api/tfsm/submit-lead",
      processData: false,
      contentType: "application/json",
      datatype: "json",
      data: JSON.stringify(form),
      success: function (data) {
        alert("Lead creado exitosamente!");
      },
      failure: function (err) {
        alert("Error al crear el Lead :(");
        console.log(err);
      },
    });
  });
});
