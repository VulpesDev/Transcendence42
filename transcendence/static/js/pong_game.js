// Initialize pong and context
const pong = document.getElementById("pong_game");
const ctx = pong.getContext("2d");

// Set canvas dimensions
pong.width = 800;
pong.height = 600;

// Set paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 6;

// Set ball properties
const ballRadius = 10;
let ballX = pong.width / 2;
let ballY = pong.height / 2;
let ballSpeedX = 6;
let ballSpeedY = 6;

// Set initial paddle positions
let leftPaddleY = pong.height / 2 - paddleHeight / 2;
let rightPaddleY = pong.height / 2 - paddleHeight / 2;

// Set initial scores
let leftPlayerScore = 0;
let rightPlayerScore = 0;

// Define variables for keyboard input
let upKeyPressed = false;
let downKeyPressed = false;
let upKeyPressedRight = false;
let downKeyPressedRight = false;

// Event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Handle key down events
function keyDownHandler(event) {
  if (event.key === "w") {
    upKeyPressed = true;
  } else if (event.key === "s") {
    downKeyPressed = true;
  } else if (event.key === "ArrowUp") {
    upKeyPressedRight = true;
  } else if (event.key === "ArrowDown") {
    downKeyPressedRight = true;
  }
}

// Handle key up events
function keyUpHandler(event) {
  if (event.key === "w") {
    upKeyPressed = false;
  } else if (event.key === "s") {
    downKeyPressed = false;
  } else if (event.key === "ArrowUp") {
    upKeyPressedRight = false;
  } else if (event.key === "ArrowDown") {
    downKeyPressedRight = false;
  }
}

// Move paddles based on key presses
function movePaddles() {
  if (upKeyPressed && leftPaddleY > 0) {
    leftPaddleY -= paddleSpeed;
  } else if (downKeyPressed && leftPaddleY < pong.height - paddleHeight) {
    leftPaddleY += paddleSpeed;
  }

  if (upKeyPressedRight && rightPaddleY > 0) {
    rightPaddleY -= paddleSpeed;
  } else if (downKeyPressedRight && rightPaddleY < pong.height - paddleHeight) {
    rightPaddleY += paddleSpeed;
  }
}

// Draw paddle
function drawPaddle(x, y, width, height) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, width, height);
}

// Draw ball
function drawBall(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

// Move ball and handle collisions
// Move ball and handle collisions
function moveBall() {
  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom walls
  if (ballY + ballRadius >= pong.height || ballY - ballRadius <= 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (
    ballX - ballRadius <= paddleWidth &&
    ballY >= leftPaddleY &&
    ballY <= leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballX + ballRadius >= pong.width - paddleWidth &&
    ballY >= rightPaddleY &&
    ballY <= rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball collision with left and right walls (scoring)
  if (ballX - ballRadius <= 0) {
    // Right player scores when the ball misses the left paddle
    increaseScore("right");
    resetBall();
  } else if (ballX + ballRadius >= pong.width) {
    // Left player scores when the ball misses the right paddle
    increaseScore("left");
    resetBall();
  }
}

// Reset ball position
function resetBall() {
  ballX = pong.width / 2;
  ballY = pong.height / 2;
  ballSpeedX = -ballSpeedX; // Reverse ball direction
  ballSpeedY = Math.random() > 0.5 ? 3 : -3; // Randomize ball's vertical speed
}

// Increase score and display winner
function increaseScore(winner) {
  if (winner === "left") {
    leftPlayerScore++;
  } else if (winner === "right") {
    rightPlayerScore++;
  }
}

// Display scores
function displayScores() {
  ctx.fillStyle = "white";
  ctx.font = "40px Poppins";
  ctx.fillText(leftPlayerScore, 350, 60);
  ctx.fillText(rightPlayerScore, 420, 60);
}

document.addEventListener("keydown", function (event) {
  // Check if the pressed key is "Esc"
  if (event.key === "Escape") {
    // Toggle pause/resume state of the game
    togglePause();
  }
});

let isPaused = false;

// Function to toggle pause/resume state of the game
function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    // If game is paused, cancel animation frame
    cancelAnimationFrame(animationId);
  } else {
    // If game is resumed, restart animation frame
    animationId = requestAnimationFrame(draw);
  }
}

// Function to draw pause screen
function drawPauseScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, pong.width, pong.height);

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Paused", pong.width / 2, pong.height / 2);
}
// Main game loop
function draw() {
  // Clear pong
  ctx.clearRect(0, 0, pong.width, pong.height);

  if (isPaused) {
    // If game is paused, draw pause screen and return
    drawPauseScreen();
    return;
  }

  // Move paddles
  movePaddles();
  // Move paddles
  movePaddles();

  // Draw paddles
  drawPaddle(0, leftPaddleY, paddleWidth, paddleHeight); // Left paddle
  drawPaddle(pong.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight); // Right paddle

  // Draw ball
  drawBall(ballX, ballY, ballRadius);

  // Move ball
  moveBall();

  // Display scores
  displayScores();

  // Check if one player reached 11 points
  if (leftPlayerScore >= 11 || rightPlayerScore >= 11) {
    let win = leftPlayerScore >= 11 ? "win" : "lose";
    document.getElementById("winner").value = win;
    document.getElementBwyId("result").value =
      leftPlayerScore + " : " + rightPlayerScore;
    document.getElementById("against").value = "2 Play";

    pong_ai_btn.click();
    endGame();
    return;
  }

  // Request next frame
  animationId = requestAnimationFrame(draw);
}

// Function to end the game and display winner message
function endGame() {
  ctx.clearRect(0, 0, pong.width, pong.height);

  ctx.fillStyle = "white";
  ctx.font = "40px Poppins";
  ctx.textAlign = "center";

  var lang = localStorage.getItem("language");
  if (lang === "de") {
    ctx.fillText("Spiel vorbei", pong.width / 2, pong.height / 2 - 40);
  } else if (lang === "it") {
    ctx.fillText("Fine del gioco", pong.width / 2, pong.height / 2 - 40);
  } else {
    ctx.fillText("Game Over", pong.width / 2, pong.height / 2 - 40);
  }

  // Determine the winner
  if (lang === "de") {
    let winner = leftPlayerScore >= 11 ? "Spieler 1" : "Spieler 2";
    ctx.fillText(`Sieger: ${winner}`, pong.width / 2, pong.height / 2);
  } else if (lang === "it") {
    let winner = leftPlayerScore >= 11 ? "Giocatore 1" : "Giocatore 2";
    ctx.fillText(`Vincitore: ${winner}`, pong.width / 2, pong.height / 2);
  } else {
    let winner = leftPlayerScore >= 11 ? "Player 1" : "Player 2";
    ctx.fillText(`Winner: ${winner}`, pong.width / 2, pong.height / 2);
  }

  // Ask for replay or back to home
  ctx.font = "20px Poppins";
  if (lang === "de") {
    ctx.fillText(
      'Drücke "R" für eine weitere Runde oder "H" zum Zurückkehren',
      pong.width / 2,
      pong.height / 2 + 40
    );
  } else if (lang === "it") {
    ctx.fillText(
      'Premere "R" per una nuova partita o "H" per ritonare',
      pong.width / 2,
      pong.height / 2 + 40
    );
  } else {
    ctx.fillText(
      'Press "R" to replay or "H" to go back to home',
      pong.width / 2,
      pong.height / 2 + 40
    );
  }

  // Add event listener for keydown events
  document.addEventListener("keydown", function (event) {
    if (event.key === "r") {
      window.location.reload();
      resetGame();
    } else if (event.key === "h") {
      // Go back to home
      window.location.href = "/games";
    }
  });
}

// Function to reset the game
function resetGame() {
  leftPlayerScore = 0;
  rightPlayerScore = 0;
  isPaused = false;
  animationId = requestAnimationFrame(draw);
}

// Call the draw function to start the game loop
let animationId = requestAnimationFrame(draw);
