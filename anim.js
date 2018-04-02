const faces = {
"wrong" : "trump_face",
"lemon" : "lemon",
"fakenews" : "trump_face",
"mslsd" : "levin",
"putin" : "putin"
}

const clipY = {"trump_face" : .642,
"lemon" : .521,
"levin" : .452,
"putin": .791
};

var playerOn = false;


const sfx = ["wrong", "lemon", "mslsd", "fakenews","putin"];


function startPlay() {
      displayFace(this.ani,faces[this.id]);
      if(this.id=="putin") {
      _("subtitle").hidden = false;
      }
      }
      
      function endPlay() {
  this.ani.mouthOpen = false;
  this.ani.bottom.style.top = "0px";
  this.ani.hidden = this.ani.hide;
  _("subtitle").hidden = true;
  }
  
  function anim() {
  var open = this.ani.mouthOpen;
  this.ani.mouthOpen = !open;
  this.ani.bottom.style.top = !open ? "5px" : "0px";
  }

function play(sound,a) {
	_(sound).ani = a;
  _(sound).play();
}

function playSound(correct, channel) {
  if (total >= numVids) return;
  if (!correct && Math.random() < .2) {
    play("wrong",_("faces"));
  } else if (channel == "CNN" && Math.random() < .33) {
    var clip = correct ? "lemon" : "fakenews";
    play(clip,_("faces"));
  } else if (channel == "MSNBC" && Math.random() < .33) {
    play("mslsd",_("faces"));
  }
  else if(channel == "RT" && Math.random() < 1) {
    play("putin",_("faces"));
  }

}


 function createFaceAnimation(width,height,id,hide) {
     var f = document.createElement("img");
     f.className = "face";
     if(width > 0) f.width = width;
     if(height > 0) f.height = height;
     var f2 = f.cloneNode();
     
     var box = document.createElement("span");
     box.id = id;
     box.appendChild(f);
     box.appendChild(f2);
       
     box.top = f;
     box.bottom = f2;
     box.mouthOpen = false;
     
     box.hidden = hide;
     box.hide = hide;
     
     return box;
    }
    
    

function displayFace(ani,face) {
var f = ani.top;
var f2 = ani.bottom;
f.src = imgSrc + face + ".png";
  f2.src = f.src;
  
  var yClip = clipY[face]*f2.height + "px";
  
  f.style.clip = "rect(auto,auto,"+yClip+",auto)";
  f2.style.clip = "rect("+yClip+",auto,auto,auto)";
  
  ani.hidden = false;
}