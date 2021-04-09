$(document).ready(function(){
    $("#openMenuBtn").click(() => alert("onclick"));
    document.getElementById("openMenuBtn").click(() => alert("element click"));

})

function toggleMenu(){
    alert("click");
}

