$(document).ready(function () {
  $(".toggleMenu").click(() => {
    let overlay = $("#menuOverlay").css("display");
    document.body.style.overflow = "hidden";
    alert('click');

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
});
