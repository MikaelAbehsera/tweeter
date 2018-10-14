$(document).ready(function () {

  //COMPOSE HOVER FEATURE
  $("#compose-button").on("mouseover", function () {
    $(this).css({
      color: "black",
      opacity: 1
    });
  }).on("mouseleave", function () {
    $(this).css({
      color: "#00a070",
      opacity: 0.8
    });
  });

  $("#compose-button").on("click", () => {
    $("#new-tweet").slideToggle("slow");
    $("#container-textarea").focus();
  });

  
});
