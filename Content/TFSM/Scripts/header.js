$(document).ready(function(){
    $("#openMenuBtn").click(() => {
        $("#menuOverlay").toggle('fade');
    });
    $(document.body).css("overflow","hidden !important");
    $("body").css("background-color","blue !important");

});

