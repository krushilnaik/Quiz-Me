var scoresElement = document.getElementById("scores");
function loadScores() {
    scoresElement.innerHTML = "";
    if (localStorage.getItem("highscores") === "") {
        console.log("No scores found.");
        localStorage.setItem("highscores", "");
        return;
    }
    var scores = localStorage.getItem("highscores")
        .split(",").map(function (rawString) {
        var regex = /^(.+): (.+) - ([0-5])$/;
        var groups = rawString.split(regex).filter(function (str) { return str !== ""; });
        return {
            quizName: groups[0],
            initials: groups[1],
            score: Number(groups[2])
        };
    }).sort(function (a, b) {
        if (a.quizName !== b.quizName) {
            return a.quizName < b.quizName ? -1 : 1;
        }
        else if (a.score !== b.score) {
            return a.score > b.score ? -1 : 1;
        }
        else if (a.initials !== b.initials) {
            return a.initials < b.initials ? -1 : 1;
        }
        else {
            return 0;
        }
    });
    if (scores.length == 0) {
        console.log("No scores found.");
        return;
    }
    var scoreList = document.createElement("ol");
    for (var _i = 0, scores_1 = scores; _i < scores_1.length; _i++) {
        var score = scores_1[_i];
        scoreList.innerHTML += "\n\t\t\t<li class=\"score\">" + score.quizName + ": " + score.initials + " - " + score.score + "</li>\n\t\t";
    }
    scoresElement.appendChild(scoreList);
}
function clearScores() {
    localStorage.setItem("highscores", "");
    scoresElement.innerHTML = "";
}
loadScores();
