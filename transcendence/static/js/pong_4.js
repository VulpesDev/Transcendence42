// Initialize pong and context
const pong = document.getElementById("pong_game");
const ctx = pong.getContext("2d");

// Set canvas dimensions
pong.width = 600;
pong.height = 600;

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
let ballSpeedX = 2;
let ballSpeedY = 2;

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
  }

  if (
    ballX + ballRadius >= pong.width - paddleWidth &&
    ballY >= rightPaddleY &&
    ballY <= rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballY + ballRadius >= pong.height - bottomPaddleHeight &&
    ballX >= bottomPaddleX &&
    ballX <= bottomPaddleX + bottomPaddleWidth
  ) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    ballY - ballRadius <= bottomPaddleHeight &&
    ballX >= topPaddleX &&
    ballX <= topPaddleX + bottomPaddleWidth
  ) {
    ballSpeedY = -ballSpeedY; // Reverse Y speed on collision
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
  } else if (ballY - ballRadius <= 0) {
    // Bottom player scores when the ball misses the top wall
    increaseScore("bottom");
    resetBall();
  } else if (ballY + ballRadius >= pong.height) {
    // Top player scores when the ball misses the bottom wall
    increaseScore("top");
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
    bottomPlayerScore >= 11
  ) {
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
  ctx.fillText("Game Over", pong.width / 2, pong.height / 2 - 40);

  // Determine the winner
  let winner = leftPlayerScore >= 11 ? "Player One" : "Player Two";
  ctx.fillText(`Winner: ${winner}`, pong.width / 2, pong.height / 2);

  // Ask for replay or back to home
  ctx.font = "20px Poppins";
  ctx.fillText(
    'Press "R" to replay or "H" to go back to home',
    pong.width / 2,
    pong.height / 2 + 40
  );

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
  bottomPlayerScore = 0;
  isPaused = false;
  animationId = requestAnimationFrame(draw);
}

// Call the draw function to start the game loop
let animationId = requestAnimationFrame(draw);
