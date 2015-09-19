console.log("test");

/**
 * Obtain GCM Registration Token
 */


function registerCallback(registrationId) {
  if (chrome.runtime.lastError) {
    // When the registration fails, handle the error and retry the
    // registration later.
    return;
  }

  // Send the registration token to your application server.
  sendRegistrationId(function(succeed) {
    // Once the registration token is received by your server,
    // set the flag such that register will not be invoked
    // next time when the app starts up.
    if (succeed)
      chrome.storage.local.set({registered: true});
  });
}

function sendRegistrationId(callback) {
  // Send the registration token to your application server
  // in a secure way.
}

chrome.runtime.onStartup.addListener(function() {
  chrome.storage.local.get("registered", function(result) {
    // If already registered, bail out.
    if (result["registered"])
      return;

    // Up to 100 senders are allowed.
    var senderIds = ["Your-Sender-ID"];
    chrome.gcm.register(senderIds, registerCallback);
  });
});


/**
 ************************************************************************
 *
 ** *****************    UPSTREAM: CLIENT to DB   33639986032************************
 *
 *
 *************************************************************************
 */




//This is the project # from the Google Developers Console.
var senderId = "33639986032";

// Make the message ID unique across the lifetime of your app.
// One way to achieve this is to use the auto-increment counter
// that is persisted to local storage.

// Message ID is saved to and restored from local storage.
var messageId = 0;
chrome.storage.local.get("messageId", function(result) {
  if (chrome.runtime.lastError)
    return;
  messageId = parseInt(result["messageId"]);
  if (isNaN(messageId))
    messageId = 0;
});

// Sets up an event listener for send error.
chrome.gcm.onSendError.addListener(sendError);

// Returns a new ID to identify the message.
function getMessageId() {
  messageId++;
  chrome.storage.local.set({messageId: messageId});
  return messageId.toString();
}


//sends a Message to server
//Inv: url is a string of url browser is currently on or fetching
function sendMessage(url) {
  var message = {
    messageId: getMessageId(),
    destinationId: senderId + "@gcm.googleapis.com",
    timeToLive: 86400,    // 1 day
    data: {
      "userid": "value1"
    }
  };
  chrome.gcm.send(message, function(messageId) {
    if (chrome.runtime.lastError) {
      // Some error occurred. Fail gracefully or try to send
      // again.
      return;
    }

    // The message has been accepted for delivery. If the message
    // can not reach the destination, onSendError event will be
    // fired.
  });
}

function sendError(error) {
  console.log("Message " + error.messageId +
      " failed to be sent: " + error.errorMessage);
}

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

function generateListEntry(listData, i) {
  var listData 
}

document.addEventListener('DOMContentLoaded', function() {
  
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if(!err) {
      console.log("We are connected");
    }
  });
  var collection = db.collection('Users');

  getCurrentTabUrl(function(url) {
    // Put the image URL in Google search.
    renderStatus('Adding info to database for ' + url);

    var listData = collection.findOne({email: getEmail()}, {recommendationList: 1});
    var collection = db.collection('test');
    var reclist = document.getElementById('recList');
    for(var i = 0; i < 5; i++) {
      var listEntry = document.createElement("list-group-item");
      listEntry.innerHTML = generateListEntry(listData, i);
    }

    var imageResult = document.getElementById('image-result');
      imageResult.width = width;
      imageResult.height = height;
      imageResult.src = imageUrl;
      imageResult.hidden = false;

    }, function(errorMessage) {
      renderStatus('Cannot display image. ' + errorMessage);
    });
  });
});