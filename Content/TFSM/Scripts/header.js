$(document).ready(function () {
  jQuery.extend(jQuery.validator.messages, {
    required: "Este campo es obligatorio",
    email: "Ingrese un valor de email válido.",
    number: "Ingrese un número válido",
    maxlength: jQuery.validator.format("Máximo {0} caracteres"),
    minlength: jQuery.validator.format("Mínimo {0} caracteres"),
  });

  jQuery.validator.addMethod(
    "isEmail",
    function (value, element) {
      let email =
        /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
      let regex = new RegExp(email);
      // if(email.test(value)){
      //   return true;
      // }
      // else{
      //   return false;
      // }
      return regex.test(value);
    },
    "Ingrese un valor de email válido"
  );

  var deviceWidth = () =>
    window.innerWidth > 0 ? window.innerWidth : screen.width;

  $(".toggleMenu").click(() => {
    let overlay = $("#menuOverlay").css("display");
    document.body.style.overflow = "hidden";

    $.when(
      $("#openMenuBtn").toggle(),
      $("#closeMenuBtn").toggle(),
      $("#menuOverlay").fadeToggle(100),
      $("#drawerMenu").toggle("slide", { direction: "right" })
    ).then(() => {
      if (overlay === "block") {
        document.body.style.overflow = "auto";
        $(".deployItems").each(function () {
          $(`#${this.id}Arrow`).removeClass("pointDown");
          $(`#${this.id}Arrow`).addClass("pointRight");
          $(`#${this.id}Items`).slideUp();
        });
      }
    });
  });

  $(".deployItems").click(function () {
    let div = $(this)[0];
    console.log($(`#${div.id}`).siblings("div[class='deployItems']"));
    $(`#${div.id}Arrow`).toggleClass("pointRight pointDown");
    $(`#${div.id}Items`).slideToggle();

    $(`#${div.id}`)
      .siblings("div[class='deployItems']")
      .each(function () {
        $(`#${this.id}Arrow`).removeClass("pointDown");
        $(`#${this.id}Arrow`).addClass("pointRight");
        $(`#${this.id}Items`).slideUp();
      });
  });

  $("#expandPlanes").click(function () {
    $("#planesArrow").toggleClass("pointRight pointDown");
    $("#listPlanes").slideToggle();
  });

  $("#expandLegales").click(function () {
    $("#legalesArrow").toggleClass("pointRight pointDown");
    $("#listLegales").slideToggle();
  });

  function openModal(modalId) {
    const modal = $(`#${modalId}`);
    document.body.style.overflow = "hidden";
    $("#modalOverlay").show("fade");
    console.log(modal);
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

  function closeModal(modalId) {
    const modal = $(`#${modalId}`);
    $("#modalOverlay").hide("fade");

    if (deviceWidth() <= 767) {
      modal.hide("slide", { direction: "down" });
    } else {
      modal.animate(
        {
          opacity: 0,
          display: "toggle",
          top: "+=50",
        },
        400,
        () => {
          modal.css({ display: "none" });
        }
      );
    }
    document.body.style.overflow = "auto";
  }

  // var termsCheckbox = "#termsCheckbox";

  $("#newsletterTerms").click(() => {
    termsCheckbox = "#termsCheckbox";
    openModal("newsletterTermsModal");
  });

  $("#plansTerms").click(() => {
    termsCheckbox = "#plansTermsCheckbox";
    openModal("newsletterTermsModal");
  });

  $("#termsCheckbox").click(function (e) {
    if ($("#termsCheckbox").prop("checked")) {
      e.preventDefault();
      termsCheckbox = "#termsCheckbox";
      openModal("newsletterTermsModal");
    }
  });

  $("#plansTermsCheckbox").click(function (e) {
    if ($("#plansTermsCheckbox").prop("checked")) {
      e.preventDefault();
      termsCheckbox = "#plansTermsCheckbox";
      openModal("newsletterTermsModal");
    }
  });

  $("#closeNewsletterTerms").click(() => closeModal("newsletterTermsModal"));

  $("#modalOverlay").click(function () {
    $(this)
      .siblings()
      .each(function () {
        if ($(this).css("display") !== "none") {
          closeModal(this.id);
        }
      });
  });

  $("#denyNewsletterTerms").click(function () {
    console.log(termsCheckbox);
    $(termsCheckbox).prop("checked", false);
    closeModal("newsletterTermsModal");
  });

  $("#acceptNewsletterTerms").click(function () {
    console.log(termsCheckbox);
    $(termsCheckbox).prop("checked", true);
    closeModal("newsletterTermsModal");
  });

  $(".social-network").click(function () {
    openModal(`${this.id}Modal`);
  });

  $("[id$='ModalClose']").click(function () {
    closeModal(`${this.dataset.modal}Modal`);
  });

  $("[id$='ModalBack']").click(function () {
    closeModal(`${this.dataset.modal}Modal`);
  });

  $("[id$='ModalContinue']").click(function () {
    closeModal(`${this.dataset.modal}Modal`);
    switch (this.dataset.modal) {
      case "instagram":
        window.open(
          "https://www.instagram.com/toyotafinancialservicesmexico/",
          "_blank"
        );
        break;
      case "facebook":
        window.open("https://www.facebook.com/TFSMexico/", "_blank");
        break;
      case "linkedin":
        window.open(
          "https://www.linkedin.com/company/toyota-financial-services-mx/",
          "_blank"
        );
        break;
      case "youtube":
        window.open(
          "https://www.youtube.com/c/ToyotaFinancialServicesMexico/",
          "_blank"
        );
        break;
    }
  });

  $(".sf-form-container").each(function () {
    var form = document.createElement("form");

    form.innerHTML = this.innerHTML;
    Object.keys(this.dataset).forEach((x) => {
      form[x] = this.dataset[x];
    });
    console.log(form);
    $(this).html(form);
  });

  var nl_validator = $("#newsletter-form").validate({
    rules: {
      'nl-email': {
        required: true,
        isEmail: true,
      },
    },
  });

  $("#newsletter-form").submit(function (e) {
    e.preventDefault();
    if ($(this).valid()) {
      if (!$("#termsCheckbox").prop("checked")) {
        termsCheckbox = "#termsCheckbox";
        openModal("newsletterTermsModal");
      } else {
        $("#nl-email").val("");
        $("#termsCheckbox").prop("checked", false);

        Toastnotify.create({
          text: "Gracias por registrarte! Serás notificado cuando tengamos cosas nuevas.",
          duration: 5000,
        });
      }
    }
  });

  $("#submit-newsletter").click(function () {
    $("#newsletter-form").submit();
  });
});
