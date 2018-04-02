//https://jsfiddle.net/0axfo92p/
//#00b300







function init() {

  
      

_("trump").src = imgSrc + "trump.jpg";
_("header").insertBefore(createFaceAnimation(100,100,"faces",true,true),_("close"));
_("end").insertBefore(createFaceAnimation(100,100,"winImage",true,true),_("finalScore"));
var width = innerWidth*0.2;
document.body.appendChild(createFaceAnimation(width,0,"putinHead",false,false));
document.body.appendChild(createFaceAnimation(width,0,"putinHead2",false,false));
displayFace(_("putinHead"),"putin");
displayFace(_("putinHead2"),"putin");
var putin = function() {play("putin",this);};
putinHead.hidden = true;
putinHead2.hidden = true;
_("putinHead").onclick = putin;
_("putinHead2").onclick = putin;



channels.forEach(function(item, index) {
  _(item).src = logos[item];
 _(item).style.border = "2px outset";
  _(item).style.cursor = "pointer";
});

$("#answer").on("show.bs.modal",function(event) {
	guess(event.relatedTarget.id);
});

$("#answer").on("shown.bs.modal",function(event) {
players[0].cueVideoById(currentVid.resourceId.videoId);
});
$("#answer").on("hide.bs.modal",function(event) {
	players[0].pauseVideo();
	_("choices").hidden = true;
});
$("#answer").on("hidden.bs.modal",function(event) {
	nextVideo();
	_("choices").hidden = false;
});

$("#carousel").on("slide.bs.carousel", function(event) {
players[event.from + 1].pauseVideo();
});

$("#carousel").on("slid.bs.carousel", function(event) {
_("hlText").innerText = guesses[event.to].video.title;
console.log(players[event.to+1].getPlayerState());
if(players[event.to+1].getPlayerState()==5) {
 players[event.to+1].cueVideoById(guesses[event.to].video.resourceId.videoId);
 }
$(this).carousel("pause");
});

$("#carousel").carousel("pause");


sfx.forEach(function(item, index) {
  var a = document.createElement("audio");
  a.src = audioSrc + item + ".mp3";
  a.id = item;
  a.onplay = startPlay;
  a.onended = endPlay;
  a.ontimeupdate = anim;
  _("audio").appendChild(a);
});

_("start").onclick = function() {
  _("intro").hidden = true;
  _("game").hidden = false;
};


  for(var i = 0;i<numVids;i++) {
 var box = document.createElement("div");
    box.className= i==0 ?"carousel-item active":"carousel-item";
    var p = document.createElement("div");
    p.id = "player"+(i+2);
    box.appendChild(p);
	_("slides").appendChild(box);
}

  
  
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

     
      
      
      updateProg();
      
       load = setInterval(function() { if(playerCount==numVids+1 && ready) {
       clearInterval(load);
     	_("start").disabled = false;
      _("start").innerText = "Start!";
      _("start").style.color = "green";
      nextVideo();
       }
      },250);
}

function onYouTubeIframeAPIReady() {
      
      for(var i = 0;i<=numVids;i++) {
       var player = new YT.Player('player'+(i+1), {
          width: '100%',
          height: '315',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          },

        playerVars:{'autoplay':0,'rel':0,'playsinline':1}
        });
        players.push(player);
        
      }
      
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
       	playerCount++;
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
       
      }
   
   
function updateProg() {
 var p = _("prog").firstElementChild;
 p.style.width = total/numVids*100 + "%";
  p.innerText = total + "/" + numVids;
}

function guess(c) {
  var correct = c == currentChannel;
  if (correct) {
    _("answerText").style.color = "green";
    _("answerText").innerText = "Correct!";
    _("wrongGuess").hidden = true;
    _("correctAnswer").firstElementChild.src = logos[c];
    score++;
  } else {
    _("answerText").style.color = red;
    _("answerText").innerText = "Wrong!";
    _("wrongGuess").hidden = false;
    _("wrongGuess").firstElementChild.src = logos[c];
    _("correctAnswer").firstElementChild.src = logos[currentChannel];
  }
 

  total++;
  updateProg();

  guesses.push({
    "video": currentVid,
    "answer": currentChannel,
    "guess": c
  });


  playSound(correct, currentChannel);




}



function reviewAnswers() {
//_("subtitle").style.color = "rgb(255, 239, 0)";
	_("hlText").innerText = guesses[0].video.title;
  _("game").hidden = true;
  _("review").hidden = false;
   players[1].cueVideoById(guesses[0].video.resourceId.videoId);
  _("finalScore").innerText = "Final Score: " + score + "/" + numVids;
  var sound = "";
  if (score / numVids < .4) { //.4
    sound = "fakenews";
    _("winText").style.color = red;
    _("winText").innerText = "Uh-oh, You are fake news!";
    
  } else if (score / numVids > .7) { //.7
    sound = "lemon";
    _("winText").style.color = "green";
    _("winText").innerText = "You are not fake news!";
  }
  if(sound != "") { 
 play(sound,_("winImage"));
    }
 


}

function nextVideo() {
  if (total >= numVids) {
    return reviewAnswers();
  }
  var randChannel = Math.floor(Math.random() * channels.length);
  currentChannel = channels[randChannel];
  var subVideos = videos[currentChannel];
  var randVideo = Math.floor(Math.random() * subVideos.length);
  currentVid = subVideos[randVideo].snippet;
  _("headline").innerText = capitalize(filter(currentVid.title, currentChannel));


}

