/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {

    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs) {
  
        var tab = tabs[0];
        var url = tab.url;
  
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
    });
}

/**
 * Gets the list of websites recommended for the user from database
 */
function getRecList() {
	var data = databaseCall();		// TODO
	var p = JSON.parse(data);
}

function renderStatus(statusText) {
	document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // Put the image URL in Google search.
    renderStatus('Adding info to database for ' + url);

    	var imageResult = document.getElementById('image-result');
      	// Explicitly set the width/height to minimize the number of reflows. For
      	// a single image, this does not matter, but if you're going to embed
      	// multiple external images in your page, then the absence of width/height
      	// attributes causes the popup to resize multiple times.
      	imageResult.width = width;
      	imageResult.height = height;
      	imageResult.src = imageUrl;
      	imageResult.hidden = false;

    }, function(errorMessage) {
      renderStatus('Cannot display image. ' + errorMessage);
    });
  });
});
