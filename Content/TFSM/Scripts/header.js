$(document).ready(function(){
    $(".toggleMenu").click(() => {
        let overlay = $("#menuOverlay").css("display");
        document.body.style.overflow = "hidden";

        $.when(
            $("#openMenuBtn").toggle(),
            $("#closeMenuBtn").toggle(),
            $("#menuOverlay").fadeToggle(100),
            $("#drawerMenu").toggle("slide", {direction: 'right'})
        )
        .then(() => {
            if(overlay === "block"){
                document.body.style.overflow = "auto";
            }
        })

    })
});

