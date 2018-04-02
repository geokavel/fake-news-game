
const channels = ["CNN","MSNBC","FOX","RT","RTAmerica"];
  

var ready = false;
var videos = [];
var vidIds = [];
gapi.load('client', start);




function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': 'AIzaSyCM-bdI36IZ8HmhlZBuIniw-hGWMnJcmgA',
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
      // clientId and scope are optional if auth is not required.

  }).then(function() {
    var makeRequest = function(playlist) {
      return gapi.client.youtube.playlistItems.list({
        'part': 'snippet',
        'maxResults': '50',
        'playlistId': playlist,
        'fields': 'items(snippet(resourceId/videoId,title,channelTitle,description,thumbnails/default))'
      });
    };

    var batch = gapi.client.newBatch();
    batch.add(makeRequest("UUupvZG-5ko_eiXAupbDfxWw"), {
      'id': 'CNN'
    });
    batch.add(makeRequest("UUaXkIU1QidjPwiAYu6GcHjg"), {
      'id': 'MSNBC'
    });
    batch.add(makeRequest("UUXIJgqnII2ZOINSWNOGFThA"), {
      'id': 'FOX'
    });
     batch.add(makeRequest("UUpwvZwUam-URkxB7g4USKpg"), {
      'id': 'RT'
    });
    batch.add(makeRequest("UUczrL-2b-gYK3l4yDld4XlQ"), {
    'id' : 'RTAmerica'
    });
    batch.then(function(response) {
      channels.forEach(function(item, index) {
        response.result[item].result.items.forEach(function(x) {
        videos.push({title:x.snippet.title,desc:x.snippet.description,channel:x.snippet.channelTitle});
        vidIds.push(x.snippet.resourceId.videoId);
        });
      });
      
      ready = true;
   

     

    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  });
};

   



