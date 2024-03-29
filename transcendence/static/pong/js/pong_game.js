// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Set paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 6;

// Set ball properties
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Set initial paddle positions
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

// Set initial scores
let leftPlayerScore = 0;
let rightPlayerScore = 0;

// Define variables for keyboard input
let upKeyPressed = false;
let downKeyPressed = false;
let upKeyPressedRight = false;
let downKeyPressedRight = false;

// Event listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// Handle key down events
function keyDownHandler(event) {
    if (event.key === 'w') {
        upKeyPressed = true;
    } else if (event.key === 's') {
        downKeyPressed = true;
    } else if (event.key === 'ArrowUp') {
        upKeyPressedRight = true;
    } else if (event.key === 'ArrowDown') {
        downKeyPressedRight = true;
    }
}

// Handle key up events
function keyUpHandler(event) {
    if (event.key === 'w') {
        upKeyPressed = false;
    } else if (event.key === 's') {
        downKeyPressed = false;
    } else if (event.key === 'ArrowUp') {
        upKeyPressedRight = false;
    } else if (event.key === 'ArrowDown') {
        downKeyPressedRight = false;
    }
}

// Main game loop
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move paddles
    movePaddles();

    // Draw paddles
    drawPaddle(0, leftPaddleY, paddleWidth, paddleHeight); // Left paddle
    drawPaddle(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight); // Right paddle

    // Draw ball
    drawBall(ballX, ballY, ballRadius);

    // Move ball
    moveBall();

    // Display scores
    displayScores();

    // Request next frame
    requestAnimationFrame(draw);
}

// Move paddles based on key presses
function movePaddles() {
    if (upKeyPressed && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
    } else if (downKeyPressed && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += paddleSpeed;
    }

    if (upKeyPressedRight && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed;
    } else if (downKeyPressedRight && rightPaddleY < canvas.height - paddleHeight) {
        rightPaddleY += paddleSpeed;
    }
}

// Draw paddle
function drawPaddle(x, y, width, height) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
}

// Draw ball
function drawBall(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
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
    if (ballY + ballRadius >= canvas.height || ballY - ballRadius <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballRadius <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballRadius >= canvas.width - paddleWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball collision with left and right walls (scoring)
    if (ballX - ballRadius <= 0) {
        // Right player scores when the ball misses the left paddle
        increaseScore('right');
        resetBall();
    } else if (ballX + ballRadius >= canvas.width) {
        // Left player scores when the ball misses the right paddle
        increaseScore('left');
        resetBall();
    }
}


// Reset ball position
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Reverse ball direction
    ballSpeedY = Math.random() > 0.5 ? 5 : -5; // Randomize ball's vertical speed
}

// Increase score and display winner
function increaseScore(winner) {
    if (winner === 'left') {
        leftPlayerScore++;
    } else if (winner === 'right') {
        rightPlayerScore++;
    }
}

// Display scores
function displayScores() {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Left Player: ' + leftPlayerScore, 20, 40);
    ctx.fillText('Right Player: ' + rightPlayerScore, canvas.width - 250, 40);
}

// Main game loop
draw();
