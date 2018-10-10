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
  $(".tweet-box").mouseover(function () {
    $(this).css({
      "border": "1.7px solid rgba(128, 128, 128, 1)"
    });
    $(".tweet-header").css({
      "opacity": "1"
    });
  });

  $(".tweet-box").mouseleave(function () {
    $(this).css({
      "border": "1.7px solid rgba(128, 128, 128, 0.3)"
    });
    $(".tweet-header").css({
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

  // Ajax post call for posting tweets 
  $("#container-form").submit(function (event) {
    const temp = $("textarea");
    if (temp.val().length >= 140 || temp.val() === "" || temp.val() === null || temp.val() === " ") {
      console.log("error");
      let error;
      if (temp.val().length >= 140) {
        error = "Tweet is too long!";
      } else {
        error = "Tweets can not be empty!";
      }
      $(".error-message").text(error);
      $(".error-message").animate({
        "margin-top": "0em",
        height: "50px",
        margin: "1em",
        color: "red"
      }, 500);
      //check for type of error
    } else {
      if(!(temp.val().length >= 140 || temp.val() === "" || temp.val() === null || temp.val() === " ")) {
        $(".error-message").animate({
          height: "0px",
        }, 500);
        $(".error-message").text("");
      }
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize(),
        success: (obj) => {
          createTweetElement(obj);
        }
      });
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