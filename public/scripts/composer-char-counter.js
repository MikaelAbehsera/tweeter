$(document).ready(function () {

  let count = 140;

  /**
   * function will calculate the character count
   * @param {*} event event will give the number of characters 
   */
  function countCharacters(event) {
    let input = event.target.value.length;
    let currentCount = count - input;
    $(".counter").text(currentCount);
    if (currentCount < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  }
  //set default at 140 
  $(".counter").text(count);
  //everytime character is added or removed 
  $("#container #container-textarea").on("input", countCharacters);
});