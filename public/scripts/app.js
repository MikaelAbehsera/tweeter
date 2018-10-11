/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  /**
   * function will iterate through db and posts all tweets to main page
   */
  function createTweetElement(index) {
    const name = index["user"]["name"];
    const avatar = index["user"]["avatars"]["small"];
    const handle = index["user"]["handle"];
    const tweet = index["content"]["text"];
    const date = new Date(index["created_at"]).toString("").split(" ").splice(0, 5).join(" ");

    // make main tweet box
    const $tweetBox = $("<section>").addClass("tweet-box");

    //header
    const $tweetHeader = $("<header>").addClass("tweet-header");
    $($tweetHeader).appendTo($tweetBox);
    const $avatar = $("<img>").attr("src", avatar).addClass("avatar").text(avatar);
    $($avatar).appendTo($tweetHeader);
    const $user = $("<h2>").addClass("user").text(name);
    $($user).appendTo($tweetHeader);
    const $handle = $("<h2>").addClass("handle").text(handle);
    $($handle).appendTo($tweetHeader);

    //middle 
    const $middleContent = $("<article>").addClass("middle-content");
    $($middleContent).appendTo($tweetBox);
    const $tweet = $("<h2>").addClass("tweet").text(tweet);
    $($tweet).appendTo($middleContent);

    //footer
    const $tweetFooter = $("<footer>").addClass("tweet-footer");
    $($tweetFooter).appendTo($tweetBox);
    const $date = $("<h2>").addClass("date").text(date);
    $($date).appendTo($tweetFooter);

    $($tweetBox).prependTo("#tweet-container");
  }

  // opacity hover feature 
  $("#tweet-container").on("mouseover", ".tweet-box", function () {
    $(this).css({
      "border": "1.7px solid rgba(128, 128, 128, 1)"
    });
    $(this).find(".tweet-header").css({
      "opacity": "1"
    });
  }).on("mouseleave", ".tweet-box", function () {
    $(this).css({
      "border": "1.7px solid rgba(128, 128, 128, 0.3)"
    });
    $(this).find(".tweet-header").css({
      "opacity": "0.6"
    });
  });


  function renderTweets(tweets) {
    // loops through tweets
    tweets.forEach((element) => {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      createTweetElement(element);
    });
  }

  function error(content) {
    let error = "";
    if (content.length >= 140) {
      error = "Tweet is too long!";
    } else if (content === "" || content === null || content === " ") {
      error = "Tweets can not be empty!";
    }
    return error;
  }

  // Ajax post call for posting tweets 
  $("#container-form").submit(function (event) {
    const temp = $("#container-textarea");
    const content = temp.val();
    const errorMessage = error(content);

    if (errorMessage) {
      $(".error-message").text(errorMessage).animate({
        height: "50px",
        margin: "1em",
        color: "red"
      }, 500);
      //check for type of error
    } else {
      //check on input if error can be removed
      if ((temp.val().length > 140 || temp.val() === "" || temp.val() === null || temp.val() === " ")) {
        $(".error-message").animate({
          height: "0px",
        }, 500);
      } else {
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: $(this).serialize(),
          success: (obj) => {
            createTweetElement(obj);
          }
        });
        //reset error and textarea and collapse compose box 
        temp.val("");
        $(".error-message").text("");
        $(".error-message").animate({
          height: "0px",
          margin: "0em",
        }, 500);
        $(".new-tweet").slideUp("slow");
        $("#container-textarea").focus();
      }
    }
    event.preventDefault();
  });


  /*
   * loads current tweets in db when page is loaded
   */
  function loadTweets() {
    $.getJSON("/tweets", function (data) {
      renderTweets(data);
    });
  }
  loadTweets();


});