const api_url = "https://tfs-sitefinity.virtualdreams.io:444/api/tfsm/";

var deviceWidth = () =>
  window.innerWidth > 0 ? window.innerWidth : screen.width;

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
    url: api_url + "getdealersbystate",
    datatype: "json",
    success: function (data) {
      var select = $("#distributor");
      data.results.forEach((state) => {
        var group = document.createElement("optgroup");
        group.label = state.Descripcion;

        state.Distribuidores.forEach((dealer) => {
          var option = document.createElement("option");
          option.id = dealer.IdDealer;
          option.value = dealer.IdDealer;
          option.innerHTML = capitalize(dealer.Dealer);
          group.append(option);
        });

        select.append(group);
      });
    },
  });

  $("#distributor").select2();

  function openModal(modalId) {
    const modal = $(`#${modalId}`);
    document.body.style.overflow = "hidden";
    $("#modalOverlay").show("fade");

    if (modal.id === "newsletterTermsModal") {
      let body = modal.querySelector(".modal-body-custom");
      $(body).animate({ scrollTop: $(body).offset().top - 20 }, "fast");
    }

    if (deviceWidth() <= 767) {
      modal.show("slide", { direction: "down" });
    } else {
      modal.animate(
        {
          display: "toggle",
          opacity: 1,
          top: "-=50",
        },
        400,
        () => modal.css({ display: "block" })
      );
    }
  }

  jQuery.extend(jQuery.validator.messages, {
    required: "Este campo es obligatorio.",
    email: "Ingrese un valor de email válido.",
    number: "Ingrese un número válido.",
    maxlength: jQuery.validator.format("Máximo {0} caracteres."),
    minlength: jQuery.validator.format("Mínimo {0} caracteres."),
  });

  // $("#planForm").validate({
  //   rules: {
  //     name: {
  //       required: true,
  //     },
  //     lastname: {
  //       required: true,
  //     },
  //     email: {
  //       required: true,
  //       email: true,
  //     },
  //     phone: {
  //       required: true,
  //     },
  //   },
  // });

  $("#name").rules("add", {
    required: true,
  });
  $("#lastname").rules("add", {
    required: true,
  });
  $("#email").rules("add", {
    required: true,
    email: true,
  });
  $("#phone").rules("add", {
    required: true,
  });

  // $("#planForm").submit(function (e) {
  //   e.preventDefault();
  //   if ($("#planForm").valid()) {
  //     if ($("#plansTermsCheckbox").prop("checked")) {
  //       submitLead();
  //     } else {
  //       termsCheckbox = "#plansTermsCheckbox";
  //       openModal("newsletterTermsModal");
  //     }
  //   }
  //   else{
  //     console.log("formulario inválido");
  //   }
  // });

  function validarFormulario() {
    if (!$("#name").valid()) {
      return false;
    } else if (!$("#lastname").valid()) {
      return false;
    } else if (!$("#email").valid()) {
      return false;
    } else if (!$("#phone").valid()) {
      return false;
    } else {
      return true;
    }
  }

  function submitLead() {
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
      url: api_url + "submit-lead",
      processData: false,
      contentType: "application/json",
      datatype: "json",
      data: JSON.stringify(form),
      success: function (data) {
        $("#distributor").val("0");
        $("#distributor").trigger("change");
        $("#plansTermsCheckbox").prop("checked", false);

        $(".float-container input").each(function () {
          $(this).val("");
          this.parentNode.classList.remove("active");
          this.parentNode.classList.remove("focus");
          this.removeAttribute("placeholder");
        });

        Toastnotify.create({
          text: "Gracias por registrarte, en breve uno de nuestros Asesores Digitales Toyota te contactará.",
        });
      },
      failure: function (err) {
        alert("Error al crear el Lead :(");
        console.log(err);
      },
    });
  }

  $("#submitPlan").click(function () {
    if (validarFormulario()) {
      if ($("#plansTermsCheckbox").prop("checked")) {
        submitLead();
      } else {
        termsCheckbox = "#plansTermsCheckbox";
        openModal("newsletterTermsModal");
      }
    } else {
      console.log("formulario inválido");
    }
  });
});
