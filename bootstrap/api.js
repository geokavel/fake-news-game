
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
        'fields': 'items(snippet(resourceId/videoId,title,thumbnails/default))'
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
        videos[item] = response.result[item].result.items;
      });
		videos["RT"] = videos["RT"].concat(response.result["RTAmerica"].result.items);
      videos["MSNBC"].forEach(function(item, index) {
        var t = item.snippet.title;
        item.snippet.title = t.substring(0, t.indexOf(" |"));
      });
      

	ready = true;

    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  });
};

gapi.load('client', start);
