$(document).ready(function () {
	function reproducirVideo() {
	  $(".ifframe").css("display", "block");
	  $(".imagen_video").css("display", "none");
	  $(".boton_video").css("display", "none");
	  $(".boton_video_hover").css("display", "none");
	  $(".ifframe")[0].src += "?autoplay=1";
	}

	$(".boton_video_hover").click(reproducirVideo);

	$(".video-box").click(function () {
		$(".video-box img").addClass("d-none");
		$(".video-box figure").removeClass("d-none");
		$(".video-box video")[0].play();
	});
});