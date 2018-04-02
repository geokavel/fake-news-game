function createImage(url, width, height) {
  var im = "<img src='" + url + "' ";
  if (width != null)
    im += "width='" + width + "' ";
  if (height != null)
    im += "height='" + height + "' ";
  im += "/>";
  return im;
}

function capitalize(s)
{
    var out="";
  var firstLetter = false;
  for(var i = 0;i<s.length;i++) {
    var c = s.charCodeAt(i);
    var cap = false;
    if(firstLetter) {
      if(c == 45 || c == 32) firstLetter = false;
    }
    else
    {
      if(65 <= c && c <=122) {
        cap = true;
        firstLetter = true;
      }
    }
     out += String.fromCharCode(cap && c>=97?c-32:c);
  }
  return out;
}



function _(element) {
  return document.getElementById(element);
}

function filter(headline, channel) {
  if (channel == "MSNBC") {
    return headline.replace(/MSNBC|Rachel Maddow|Chris Hayes|Lawrence O'Donnell|Chris Matthews|Matthews|Maddow|Lawrence|Hayes/, "*");
  }
  if (channel == "CNN") {
    return headline.replace(/CNN|Jake Tapper|Brian Stelter|Tapper|Stelter|Lemon/, "*");
  }
  if (channel == "FOX") {
    return headline.replace(/FOX|Fox News|Hannity|Tucker|Gutfeld|Ingraham|Napolitano|Hume|Special Report/, "*");
  }
  if(channel == "RT") {
    return headline.replace(/RT|CrossTalk|RAW/,"*");
  }
  return headline;
}

