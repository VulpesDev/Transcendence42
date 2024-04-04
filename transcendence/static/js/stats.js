// Data from Django views
// Calculate wins, losses, and draws
var wins = gameHistory.filter((game) => game.result === "win").length;
var losses = gameHistory.filter((game) => game.result === "lose").length;
var draws = gameHistory.filter((game) => game.result === "draw").length;

// Calculate closeness of wins
var winCloseness = gameHistory.map(
  (game) =>
    parseFloat(game.score.split(":")[0]) - parseFloat(game.score.split(":")[1])
);
var avgWinCloseness =
  winCloseness.reduce((acc, val) => acc + val, 0) / winCloseness.length;

// Calculate player's development over time
var winCountByIndex = Array(gameHistory.length).fill(0);
gameHistory.forEach((game, index) => {
  if (game.result === "win") {
    winCountByIndex[index] = (index === 0 ? 0 : winCountByIndex[index - 1]) + 1;
  } else {
    winCountByIndex[index] = index === 0 ? 0 : winCountByIndex[index - 1];
  }
});

// Donut graph for wins, losses, draws
new Chart(document.getElementById("donutGraph1"), {
  type: "doughnut",
  data: {
    labels: ["Wins", "Losses", "Draws"],
    datasets: [
      {
        data: [wins, losses, draws],
        backgroundColor: ["#36a2eb", "#ff6384", "#ffce56"],
      },
    ],
  },
  options: {},
});

// Donut graph for closeness of wins
new Chart(document.getElementById("donutGraph2"), {
  type: "doughnut",
  data: {
    labels: ["Average Win Closeness", "Remaining"],
    datasets: [
      {
        data: [avgWinCloseness, 10 - avgWinCloseness],
        backgroundColor: ["#36a2eb", "#e7e7e7"],
      },
    ],
  },
  options: {},
});

// Line graph for player's development
new Chart(document.getElementById("lineGraph"), {
  type: "line",
  data: {
    labels: gameHistory.map((game, index) => index + 1),
    datasets: [
      {
        label: "Wins Over Time",
        data: winCountByIndex,
        borderColor: "#36a2eb",
        fill: false,
      },
    ],
  },
  options: {},
});
