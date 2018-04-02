const lightGreen = "#00b300";
const blue = "rgb(38,43,65)";
const red = "rgb(168,33,40)";
const cream = "rgb(250,245,223)";

const audioSrc = "../audio/";
const imgSrc = "../images/";
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

var playerCount = 0;
var ready = false;
var load;
var currentChannel = "";
var currentVid = {};
var videos = {};
var guesses = [];
var players = [];

var score = 0;
var total = 0;