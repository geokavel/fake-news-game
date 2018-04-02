const lightGreen = "#00b300";
const blue = "rgb(38,43,65)";
const red = "rgb(168,33,40)";
const cream = "rgb(250,245,223)";

const audioSrc = "http://localhost/news_game/audio/";
const imgSrc = "http://localhost/news_game/images/";
const videoSrc = "https://www.youtube.com/embed/";

const channels = ["FOX","CNN", "MSNBC","RT"];
const logos = {
  "CNN": imgSrc + "cnn-logo.png",
  "MSNBC": imgSrc + "MSNBC_logo.png",
  "FOX": imgSrc + "Fox_News_Channel_logo.svg",
  "RT": imgSrc + "Russia-today-logo.svg"
};

const putin = imgSrc+"putin.png";
const numVids = 7;

var currentChannel = "";
var currentVid = {};
var videos = {};
var guesses = [];

var score = 0;
var total = 0;