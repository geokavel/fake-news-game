//https://jsfiddle.net/0axfo92p/
//#00b300







function init() {
_("trump").src = imgSrc + "trump.jpg";
_("game").insertBefore(createFaceAnimation(100,100,"faces",true),_("score"));
_("end").insertBefore(createFaceAnimation(100,100,"winImage",true),_("finalScore"));
var width = innerWidth*0.2;
document.body.appendChild(createFaceAnimation(width,0,"putinHead",false));
document.body.appendChild(createFaceAnimation(width,0,"putinHead2",false));
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
  _(item).onclick = function() {guess(this.id);}
});

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






updateScore();
}

   
   
function updateScore() {
  _("score").innerText = "Score: " + score + "/" + total;
}

function guess(c) {
  var correct = c == currentChannel;
  if (correct) {
    _("headline").style.background = /*"Lime"*/"rgba(0,255,0,0.7)";
    _("answer").style.color = "green";
    _("answer").innerText = "Correct!";
    score++;
  } else {
    _("headline").style.background = /*"#ff471a"*/"rgba(255,0,0,0.7)";
    _("answer").style.color = red;
    _("answer").innerText = "Wrong!";
  }
  total++;
  updateScore();

  guesses.push({
    "video": currentVid,
    "answer": currentChannel,
    "guess": c
  });


  setTimeout(function() {
    _("headline").style.background = "initial";
    nextVideo();
  }, 250);

  playSound(correct, currentChannel);




}


function reviewAnswers() {
//_("subtitle").style.color = "rgb(255, 239, 0)";
  _("game").hidden = true;
  _("review").hidden = false;
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
 
  
  guesses.forEach(function(item, index) {
    var box = document.createElement("div");
    //box.style.width="25%";
    box.style.display = "inline";
    var thumb = document.createElement("img");
    thumb.className = "thumbnail";
    thumb.src = item.video.thumbnails.default.url;
    thumb.name = index;
    thumb.channel = item.answer;
    var color = item.guess == item.answer ? "green" : red;
    thumb.style.border = "5px dotted " + color;
    

    thumb.onclick = function() {
      if (!playerOn) {
        _("playerBox").hidden = false;
        playerOn = true;
      }
      	var russia = this.channel == "RT";
      	_("putinHead").hidden = russia?false:true;
      	_("putinHead2").hidden = russia?false:true;
        _("putinHead").style.opacity = russia?1:0;
        _("putinHead2").style.opacity = russia?1:0;
        document.body.style.backgroundBlendMode = russia?"multiply":"normal";

      var vid = guesses[this.name].video;
      _("player").src = videoSrc + vid.resourceId.videoId + "?autoplay=1&rel=0";

      _("revHL").innerHTML = createImage(logos[guesses[this.name].answer], 20, 20) + vid.title;
      //_("revHL").scrollIntoView();
    };
    box.appendChild(thumb);
 
    var tip = document.createElement("div");
    tip.className = "float";
    var check = "<span style='color:green;font-size:36px'>"+String.fromCharCode(9989)+"</span>";
    var cross = "<span style='color:red;font-size:36px'>"+String.fromCharCode(10060)+"</span>";
    var text="";
    if(item.answer=="RT") text += createImage(putin,50,50);
    text += createImage(logos[item.answer],50,50) + check;
    if(item.guess != item.answer) text = createImage(logos[item.guess], 50, 50) + cross + "<br/>" + text;
    var hl = "<h4 style='font-style:italic;color:white'>" + item.video.title + "</h4>";
    tip.innerHTML = hl + text;
    box.appendChild(tip);
       _("thumbnails").appendChild(box);
  });

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

