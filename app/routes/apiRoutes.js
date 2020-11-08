var friendsResults = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        return res.json(friendsResults);
    })

    app.post("/api/friends", function (req, res) {

        console.log(req.body);

        var newFriend = req.body;
        var newFriendScore = req.body.scores;
        var bestFriend = {
            name: "",
            photo: "",
            difference: 1000
        }
        for (var i = 0; i < friendsResults.length; i++) {
            var currentDifference = 0;
            for (var j = 0; j < friendsResults[i].scores.length; j++) {
                currentDifference += Math.abs(parseInt(friendsResults[i].scores[j]) - parseInt(newFriendScore[j]))
            }
            if (currentDifference < bestFriend.difference) {
                bestFriend.name = friendsResults[i].name;
                bestFriend.photo = friendsResults[i].photo;
                bestFriend.difference = currentDifference;
            }
        }
        friendsResults.push(newFriend);

        res.json(bestFriend);
    });


}