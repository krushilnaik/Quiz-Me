let scoresElement = document.getElementById("scores");

function loadScores() {
	scoresElement.innerHTML = "";

	if ([null, {}].includes(localStorage.getItem("highscores"))) {
		console.log("No scores found.");
		localStorage.setItem("highscores", "{}");
		return;
	}

	let scores: Object = JSON.parse(localStorage.getItem("highscores"));

	if (Object.keys(scores).length == 0) {
		console.log("No scores found.");
		return;
	}

	var scoreList = document.createElement("ol");

	for (const [player, score] of Object.entries(scores)) {
		scoreList.innerHTML += `
			<li class="score">${player} - ${score}</li>
		`;
	}

	scoresElement.appendChild(scoreList);
}

function clearScores() {
	localStorage.setItem("highscores", "{}");
	scoresElement.innerHTML = "";
}

loadScores();
