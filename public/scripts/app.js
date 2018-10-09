/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  var array = [{
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }];

  /* <section class="tweet">
          <h2></h2>
          <form method="POST" action="/tweets/">
            <textarea name="text" placeholder="What are you humming about?"></textarea>
            <div class="flex" >
              <input type="submit" value="Tweet">
              <span class="counter"></span>
            </div>
          </form>
        </section> */
  /**
   * function will iterate through db and posts all tweets to main page
   */
  function tweeter(array) {
    const name = array[0]["user"]["name"];
    const avatar = array[0]["user"]["avatars"]["small"];
    const handle = array[0]["user"]["handle"];
    const tweet = array[0]["content"]["text"];
    const date = new Date(array[0]["created_at"]).toString("").split(" ").splice(0, 5).join(" ");

    $("#tweet-container").append("<section class='tweet-box' ></section>");
    // making header with avatar, user name, and handle.
    $(".tweet-box").append("<header class='tweet-header' ></header>");
    $(".tweet-header").append(`<img class='avatar' src=${avatar} >`);
    $(".tweet-header").append(`<h2 class='user' >${name}</h2>`);
    $(".tweet-header").append(`<h2 class='handle' >${handle}</h2>`);
    // making article
    $(".tweet-box").append("<article class='middle-content' ></article>");
    $(".middle-content").append(`<h2 class='tweet' >${tweet}</h2>`);
    // making footer
    $(".tweet-box").append("<footer class='tweet-footer' ></footer>");
    $(".tweet-footer").append(`<h2 class='date' >${date}</h2>`);

  }

  tweeter(array);
});
