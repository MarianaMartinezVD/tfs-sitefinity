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

  function openNewsletterTerms() {
    document.body.style.overflow = "hidden";
    $("#newsletterTermsOverlay").show("fade");
    $("#newsletterTermsBody").animate(
      { scrollTop: $("#newsletterTermsBody").offset().top - 20 },
      "fast"
    );
    if (deviceWidth() <= 767) {
      $("#newsletterTermsModal").show("slide");
    } else {
      $("#newsletterTermsModal").animate(
        {
          display: "toggle",
          opacity: 1,
          top: "-=50",
        },
        400,
        () => $("#newsletterTermsModal").css({ display: "block" })
      );
    }
  }

  function closeNewsletterTerms() {
    $("#newsletterTermsOverlay").hide("fade");
    console.log(deviceWidth());
    if (deviceWidth() <= 767) {
      $("#newsletterTermsModal").hide("slide");
    } else {
      $("#newsletterTermsModal").animate(
        {
          opacity: 0,
          display: "toggle",
          top: "+=50",
        },
        400,
        () => {
          $("#newsletterTermsModal").css({ display: "none" });
        }
      );
    }
    document.body.style.overflow = "auto";
  }

  $("#newsletterTerms").click(openNewsletterTerms);
  $("#closeNewsletterTerms").click(closeNewsletterTerms);
  $("#newsletterTermsOverlay").click(closeNewsletterTerms);

  $("#termsCheckbox").click(function (e) {
    if ($("#termsCheckbox").prop("checked")) {
      e.preventDefault();
      openNewsletterTerms();
    }
  });

  $("#denyNewsletterTerms").click(function () {
    $("#termsCheckbox").prop("checked", false);
    closeNewsletterTerms();
  });
  $("#acceptNewsletterTerms").click(function () {
    $("#termsCheckbox").prop("checked", true);
    closeNewsletterTerms();
  });
});
