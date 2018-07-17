const nodemon = require('nodemon');
const debug = require('debug')('app');
const twitter = require('twitter');
const config = require('./config/config');

//require('./functions/likeTweet');
//require('./functions/listLikedTweets');
require('./functions/followUser');
