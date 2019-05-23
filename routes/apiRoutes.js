var Friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        return res.json(Friends);
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
        for (var i = 0; i < Friends.length; i++) {
            var currentDifference = 0;
            for (var j = 0; j < Friends[i].scores.length; j++) {
                currentDifference += Math.abs(parseInt(Friends[i].scores[j]) - parseInt(newFriendScore[j]))
            }
            if (currentDifference < bestFriend.difference) {
                bestFriend.name = Friends[i].name;
                bestFriend.photo = Friends[i].photo;
                bestFriend.difference = currentDifference;
            }
        }
        Friends.push(newFriend);

        res.json(bestFriend);
    });


}