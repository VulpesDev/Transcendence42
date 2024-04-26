// Initialize pong and context
const pong = document.getElementById("pong_game");
const ctx = pong.getContext("2d");

// Set canvas dimensions
pong.width = 600;
pong.height = 600;

// Set last paddle contact, this is required to determine who actually scored
let leftPlayerContact = false;
let rightPlayerContact = false;
let bottomPlayerContact = false;
let topPlayerContact = false;

// Set paddle properties
const paddleWidth = 10;
const bottomPaddleWidth = 100;
const paddleHeight = 100;
const bottomPaddleHeight = 20;
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
let bottomPaddleX = pong.width / 2 - bottomPaddleWidth / 2;
let topPaddleX = pong.width / 2 - bottomPaddleWidth / 2;

// Set initial scores
let leftPlayerScore = 0;
let rightPlayerScore = 0;
let bottomPlayerScore = 0;
let topPlayerScore = 0;

// Define variables for keyboard input
let upKeyPressed = false;
let downKeyPressed = false;
let upKeyPressedRight = false;
let downKeyPressedRight = false;
let leftKeyPressedBottom = false;
let rightKeyPressedBottom = false;
let leftKeyPressedTop = false;
let rightKeyPressedTop = false;

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
  } else if (event.key === "n") {
    leftKeyPressedBottom = true;
  } else if (event.key === "m") {
    rightKeyPressedBottom = true;
  } else if (event.key === "c") {
    leftKeyPressedTop = true;
  } else if (event.key === "v") {
    rightKeyPressedTop = true;
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
  } else if (event.key === "n") {
    leftKeyPressedBottom = false;
  } else if (event.key === "m") {
    rightKeyPressedBottom = false;
  } else if (event.key === "c") {
    leftKeyPressedTop = false;
  } else if (event.key === "v") {
    rightKeyPressedTop = false;
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

function moveBottomPaddle() {
  if (leftKeyPressedBottom && bottomPaddleX > 0) {
    bottomPaddleX -= paddleSpeed;
  } else if (
    rightKeyPressedBottom &&
    bottomPaddleX < pong.width - bottomPaddleWidth
  ) {
    bottomPaddleX += paddleSpeed;
  }

  if (leftKeyPressedTop && topPaddleX > 0) {
    topPaddleX -= paddleSpeed;
  } else if (
    rightKeyPressedTop &&
    topPaddleX < pong.width - bottomPaddleWidth
  ) {
    topPaddleX += paddleSpeed;
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

  // Ball collision with paddles
  if (
    ballX - ballRadius <= paddleWidth &&
    ballY >= leftPaddleY &&
    ballY <= leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    leftPlayerContact = true;
    rightPlayerContact = false;
    bottomPlayerContact = false;
    topPlayerContact = false;
  }

  if (
    ballX + ballRadius >= pong.width - paddleWidth &&
    ballY >= rightPaddleY &&
    ballY <= rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    leftPlayerContact = false;
    rightPlayerContact = true;
    bottomPlayerContact = false;
    topPlayerContact = false;
  }

  if (
    ballY + ballRadius >= pong.height - bottomPaddleHeight &&
    ballX >= bottomPaddleX &&
    ballX <= bottomPaddleX + bottomPaddleWidth
  ) {
    ballSpeedY = -ballSpeedY;
    leftPlayerContact = false;
    rightPlayerContact = false;
    bottomPlayerContact = true;
    topPlayerContact = false;
  }

  if (
    ballY - ballRadius <= bottomPaddleHeight &&
    ballX >= topPaddleX &&
    ballX <= topPaddleX + bottomPaddleWidth
  ) {
    ballSpeedY = -ballSpeedY; // Reverse Y speed on collision
    leftPlayerContact = false;
    rightPlayerContact = false;
    bottomPlayerContact = false;
    topPlayerContact = true;
  }

  // Ball collision with left and right walls (scoring)
  // Who touched the ball last? That player will be rewarded.
  let scorer;
  if (rightPlayerContact === true) scorer = "right";
  else if (leftPlayerContact === true) scorer = "left";
  else if (topPlayerContact === true) scorer = "top";
  else if (bottomPlayerContact === true) scorer = "bottom";
  else scorer = "noone";

  if (ballX - ballRadius <= 0) {
    // Left paddle/player missed the ball
    if (scorer !== "noone") increaseScore(scorer);
    resetBall();
  } else if (ballX + ballRadius >= pong.width) {
    // Right paddle/player missed the ball
    if (scorer !== "noone") increaseScore(scorer);
    resetBall();
  }
  if (ballY - ballRadius <= 0) {
    // Top paddle/player missed the ball
    if (scorer !== "noone") increaseScore(scorer);
    resetBall();
  } else if (ballY + ballRadius >= pong.height) {
    // Bottom paddle/player missed the ball
    if (scorer !== "noone") increaseScore(scorer);
    resetBall();
  }
}

// Reset ball position
function resetBall() {
  ballX = pong.width / 2;
  ballY = pong.height / 2;
  //ballSpeedX = -ballSpeedX; // Reverse ball direction
  ballSpeedX = Math.random() > 0.5 ? 2 : -2;
  ballSpeedY = Math.random() > 0.5 ? 2 : -2; // Randomize ball's vertical speed

  // resetting last recorded paddle/player contact with ball
  leftPlayerContact = false;
  rightPlayerContact = false;
  bottomPlayerContact = false;
  topPlayerContact = false;
}

// Increase score and display winner
function increaseScore(winner) {
  if (winner === "left") {
    leftPlayerScore++;
  } else if (winner === "right") {
    rightPlayerScore++;
  } else if (winner === "bottom") {
    bottomPlayerScore++;
  } else if (winner === "top") {
    topPlayerScore++;
  }
}

// Display scores
function displayScores() {
  ctx.fillStyle = "white";
  ctx.font = "40px Poppins";
  ctx.fillText(leftPlayerScore, 100, 300);
  ctx.fillText(rightPlayerScore, 500, 300);
  ctx.fillText(bottomPlayerScore, 250, 500);
  ctx.fillText(topPlayerScore, 250, 100);
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

  moveBottomPaddle();

  // Draw paddles
  drawPaddle(0, leftPaddleY, paddleWidth, paddleHeight); // Left paddle
  drawPaddle(pong.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight); // Right paddle
  drawPaddle(
    bottomPaddleX,
    pong.height - bottomPaddleHeight,
    bottomPaddleWidth,
    bottomPaddleHeight
  );
  drawPaddle(topPaddleX, 0, bottomPaddleWidth, bottomPaddleHeight);

  // Draw ball
  drawBall(ballX, ballY, ballRadius);

  // Move ball
  moveBall();

  // Display scores
  displayScores();

  // Check if one player reached 11 points
  if (
    leftPlayerScore >= 11 ||
    rightPlayerScore >= 11 ||
    bottomPlayerScore >= 11 ||
    topPlayerScore >= 11
  ) {
    let win = leftPlayerScore >= 11 ? "win" : "lose";
    document.getElementById("winner").value = win;
    document.getElementById("result").value =
      leftPlayerScore +
      " : " +
      rightPlayerScore +
      " : " +
      bottomPlayerScore +
      " : " +
      topPlayerScore;
    document.getElementById("against").value = "P. 2-4";

    //pong_4_btn.click();
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
  let winner;
  if (lang === "de") {
    if (leftPlayerScore >= 11) winner = "Spieler 1";
    else if (rightPlayerScore >= 11) winner = "Spieler 2";
    else if (topPlayerScore >= 11) winner = "Spieler 3";
    else if (bottomPlayerScore >= 11) winner = "Spieler 4";
    ctx.fillText(`Sieger: ${winner}`, pong.width / 2, pong.height / 2);
  } else if (lang === "it") {
    if (leftPlayerScore >= 11) winner = "Giocatore 1";
    else if (rightPlayerScore >= 11) winner = "Giocatore 2";
    else if (topPlayerScore >= 11) winner = "Giocatore 3";
    else if (bottomPlayerScore >= 11) winner = "Giocatore 4";
    ctx.fillText(`Vincitore: ${winner}`, pong.width / 2, pong.height / 2);
  } else {
    if (leftPlayerScore >= 11) winner = "Player 1";
    else if (rightPlayerScore >= 11) winner = "Player 2";
    else if (topPlayerScore >= 11) winner = "Player 3";
    else if (bottomPlayerScore >= 11) winner = "Player 4";
    ctx.fillText(`Winner: ${winner}`, pong.width / 2, pong.height / 2);
  }

  // Sending the gamedata and resetting
  ctx.font = "20px Poppins";
  if (lang === "de")
  {
	ctx.fillText('Drücke "R", um das Resultat zu bestätigen und eine neue Runde zu beginnen.', pong.width / 2, pong.height / 2 + 40);
  }
  else if (lang === "it")
  {
	ctx.fillText('Premere "R" per confermare il risultato ed iniziare una nuova partita.', pong.width / 2, pong.height / 2 + 40);
  }
  else
  {
	ctx.fillText('Press "R" to confirm the result and to begin another round.', pong.width / 2, pong.height / 2 + 40);
  }

  // Add event listener for keydown events
  document.addEventListener("keydown", function (event) {
    if (event.key === "r") {
      window.location.reload();
      pong_4_btn.click();
      resetGame();
    }
  });
}

// Function to reset the game
function resetGame() {
  leftPlayerScore = 0;
  rightPlayerScore = 0;
  bottomPlayerScore = 0;
  isPaused = false;
  animationId = requestAnimationFrame(draw);
}

// Call the draw function to start the game loop
let animationId = requestAnimationFrame(draw);
