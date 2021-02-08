var scoresElement = document.getElementById("scores");
function loadScores() {
    scoresElement.innerHTML = "";
    if ([null, {}].includes(localStorage.getItem("highscores"))) {
        console.log("No scores found.");
        localStorage.setItem("highscores", "{}");
        return;
    }
    var scores = JSON.parse(localStorage.getItem("highscores"));
    if (Object.keys(scores).length == 0) {
        console.log("No scores found.");
        return;
    }
    var scoreList = document.createElement("ol");
    for (var _i = 0, _a = Object.entries(scores); _i < _a.length; _i++) {
        var _b = _a[_i], player = _b[0], score = _b[1];
        console.log(player, score);
        var listItem = document.createElement("li");
        var temp = document.createElement("div");
        temp.className = "score";
        temp.innerText = player + " - " + score;
        listItem.appendChild(temp);
        scoreList.appendChild(listItem);
    }
    scoresElement.appendChild(scoreList);
}
function clearScores() {
    localStorage.setItem("highscores", "{}");
    scoresElement.innerHTML = "";
}
loadScores();
