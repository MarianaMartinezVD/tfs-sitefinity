$(document).ready(function(){
    $("#openMenuBtn").click(() => {
        $("#menuOverlay").fadeToggle('fade');
    });
    $(document.body).css("overflow","hidden !important");
    $("body").css("background-color","blue !important");

});

