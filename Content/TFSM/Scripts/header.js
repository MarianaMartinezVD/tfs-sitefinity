$(document).ready(function () {
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

  $("#newsletterTerms").click(() => openModal("newsletterTermsModal"));

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

  $("#termsCheckbox").click(function (e) {
    if ($("#termsCheckbox").prop("checked")) {
      e.preventDefault();
      openModal("newsletterTermsModal");
    }
  });

  $("#denyNewsletterTerms").click(function () {
    $("#termsCheckbox").prop("checked", false);
    closeModal("newsletterTermsModal");
  });

  $("#acceptNewsletterTerms").click(function () {
    $("#termsCheckbox").prop("checked", true);
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
});
