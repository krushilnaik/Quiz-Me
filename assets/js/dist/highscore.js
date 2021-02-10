// Backup highscores
// 
// 'JavaScript': KN - 5,'Star Wars': KN - 5,'JavaScript': KN - 3,'JavaScript': RDJ - 5,'Marvel Cinematic Universe': RDJ - 0,'Marvel Cinematic Universe': KN - 5
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
        var regex = /^'(.+)': (.+) - ([0-5])$/;
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
    var scoreBoard = document.createElement("div");
    scoreBoard.className = "score-board";
    var quizGroup = document.createElement("div");
    quizGroup.className = "quiz-group";
    var currentQuiz = "";
    for (var _i = 0, _a = Object.entries(scores); _i < _a.length; _i++) {
        var _b = _a[_i], i = _b[0], score = _b[1];
        if (currentQuiz !== score.quizName) {
            currentQuiz = score.quizName;
            scoreBoard.appendChild(quizGroup);
            quizGroup = document.createElement("div");
            quizGroup.className = "quiz-group";
            quizGroup.innerHTML += "<div class=\"quiz-topic\">" + score.quizName + "</div>";
        }
        var scoreGroup = document.createElement("div");
        scoreGroup.className = "score-group";
        scoreGroup.innerHTML = "\n\t\t\t<span class=\"initials\">" + score.initials + "</span>\n\t\t\t<span class=\"score\">" + score.score + "</span>\n\t\t";
        quizGroup.appendChild(scoreGroup);
        if (Number(i) === scores.length - 1) {
            scoreBoard.appendChild(quizGroup);
        }
    }
    scoresElement.appendChild(scoreBoard);
}
function clearScores() {
    localStorage.setItem("highscores", "");
    scoresElement.innerHTML = "";
}
loadScores();
