"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  const ObjectID = require("mongodb").ObjectID;   


  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insert(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function (callback) {
      db.collection("tweets").find().toArray(callback);
    },

    addLike: function (id, callback) {
      // const tweet = db.collection("tweets").find(id);
      db.collection("tweets").update({
        _id: ObjectID(id)
      }, {
        $inc: {
          likes: 1
        }
      }, callback);
    }
  };
};
