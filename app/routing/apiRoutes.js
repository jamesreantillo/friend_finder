var friends = require('../data/friends.js');

module.exports = function (app) {
  
  app.get('/api/friends', function (req,res) {
      res.json(friends);
  });

  
  app.post('/api/friends', function (req, res) {
      
      var newFriend = req.body;

      
      var bestMatch = {};

      for(var i = 0; i < newFriend.scores.length; i++) {
        // console.log(newFriend.scores)
        if(newFriend.scores[i] == "1 (Strongly Disagree)") {
          newFriend.scores[i] = 1;
        } else if(newFriend.scores[i] == "5 (Strongly Agree)") {
          newFriend.scores[i] = 5;
        } else {
          newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }
      }
      

      var bestMatchIndex = 0;
      //greatest score difference for a question is 4, therefore greatest difference is 4 times # of questions in survey
      var bestMatchDifference = 40;

      for(var i = 0; i < friends.length; i++) {
        var totalDifference = 0;

        for(var j = 0; j < friends[i].scores.length; j++) {
          var differenceOneScore = Math.abs(friends[i].scores[j] - newFriend.scores[j]);
          totalDifference += differenceOneScore;
        }

        
        if (totalDifference < bestMatchDifference) {
          bestMatchIndex = i;
          bestMatchDifference = totalDifference;
        }
      }

      
      bestMatch = friends[bestMatchIndex];

      
      friends.push(newFriend);

      
      res.json(bestMatch);
  });

};