

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of friends
// ===============================================================================

var friends = require('../models/friends');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    function difference(userScores, friendScores) {
        var i = userScores.length;
        var diff = 0;
        while (i--) {
            diff += Math.abs(userScores[i] - friendScores[i]);
        }
        return diff;
    }
    
    var bestMatch = [-1, 41];
    // var i = friends.length;
    for (var i = 0, friendsLength = friends.length; i<friendsLength; i++) {
        currentDiff = difference(req.body.scores, friends[i].scores);
        if (currentDiff < bestMatch[1]) {
            bestMatch[0] = i;
            bestMatch[1] = currentDiff;
            if (currentDiff == 0) {
                break;
            };
        }
    }
    friends.push(req.body);
    result = {name: friends[bestMatch[0]].name, photo: friends[bestMatch[0]].photo};
    res.json(result);
  });
};
