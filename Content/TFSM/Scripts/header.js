$(document).ready(function(){
    $("#openMenuBtn").click(() => {
        $("#menuOverlay").show('smooth');
    });
    $(document.body).css("overflow","hidden !important");
    $("body").css("background-color","blue !important");

});

