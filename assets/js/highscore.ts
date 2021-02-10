interface ScoreModel {
	quizName: string;
	initials: string;
	score: number;
}

let scoresElement = document.getElementById("scores");

function loadScores() {
	scoresElement.innerHTML = "";

	if (localStorage.getItem("highscores") === "") {
		console.log("No scores found.");
		localStorage.setItem("highscores", "");
		return;
	}

	let scores: ScoreModel[] = localStorage.getItem("highscores")
		.split(",").map(
			(rawString) => {
				let regex = /^(.+): (.+) - ([0-5])$/;
				let groups: string[] = rawString.split(regex).filter((str) => str !== "");
				return {
					quizName: groups[0],
					initials: groups[1],
					score: Number(groups[2])
				};
			}
		).sort(
			(a, b) => {
				if (a.quizName !== b.quizName) {
					return a.quizName < b.quizName ? -1 : 1;
				} else if (a.score !== b.score) {
					return a.score > b.score ? -1 : 1;
				} else if (a.initials !== b.initials) {
					return a.initials < b.initials ? -1 : 1;
				} else {
					return 0;
				}
			}
		)
	;

	if (scores.length == 0) {
		console.log("No scores found.");
		return;
	}

	var scoreList = document.createElement("ol");

	for (const score of scores) {
		scoreList.innerHTML += `
			<li class="score">${score.quizName}: ${score.initials} - ${score.score}</li>
		`;
	}

	scoresElement.appendChild(scoreList);
}

function clearScores() {
	localStorage.setItem("highscores", "");
	scoresElement.innerHTML = "";
}

loadScores();
