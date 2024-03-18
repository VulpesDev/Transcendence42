// Initialize TicTacToe and context.
var canvas = document.getElementById('ttt_game');
var context = canvas.getContext('2d');

// Set canvas dimensions.
canvas.width = 600;
canvas.height = 600;

// Create array for the playing field
// 1 = taken by player 1
// 2 = taken by player 2
var fields = [0, 0, 0, 0, 0, 0, 0, 0, 0];
				
// Update these to avoid rendering from
// occuring more than once on fields.
var rendered = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Setting up array for holding images.
var base_image = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Keeping track of whose turn it is.
// 1 = player 1    |    2 = player 2
var turn_tracker;

// Keeping track of when to end the game.
// 1 = player 1    |    2 = player 2
var ttt_winner;

// Define variables for mouse input.
// 0 = nothing pressed.
// 1 = left mouse button.
// 2 = right mouse button.


var mouseDown = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var mouseDownCount = 0;

function switchTurn()
{
	if (turn_tracker === 1)
		turn_tracker = 2;
	else if (turn_tracker === 2)
		turn_tracker = 1;
}

// Draw the gamesymbols
// 210 px distance between each symbol
// 25 x 25 is the base position (top left)
function drawSymbol()
{
	var _x = 0;
	var _y = 0;
	
	for (let x = 0; x < 9; x++)
	{
		if (fields[x] > 0 && rendered[x] === 0)
		{
			base_image[x] = new Image();
			if (fields[x] === 1)
				base_image[x].src = '/static/assets/ttt_images/ttt_circle.png';
			else if (fields[x] === 2)
				base_image[x].src = '/static/assets/ttt_images/ttt_cross.png';
			
			if (x === 0)
			{
				_x = 25; _y = 25;
			}
			else if (x === 1)
			{
				_x = 235, _y = 25;
			}
			else if (x === 2)
			{
				_x = 445; _y = 25;
			}
			else if (x === 3)
			{
				_x = 25; _y = 235;
			}
			else if (x === 4)
			{
				_x = 235; _y = 235;
			}
			else if (x === 5)
			{
				_x = 445; _y = 235;
			}
			else if (x === 6)
			{
				_x = 25; _y = 445;
			}
			else if (x === 7)
			{
				_x = 235; _y = 445;
			}
			else if (x === 8)
			{
				_x = 445; _y = 445;
			}
			context.drawImage(base_image[x], _x, _y);
			rendered[x] = 1;
		}
	}
	if (fields[0] && fields[1] && fields[2] && fields[3] && fields[4]
		&& fields[5] && fields[6] && fields[7] && fields[8])
	{
		turn_tracker = 0;
	}
	else if (checkWinCondition() > 0)
	{
		turn_tracker = 0;
	}
	else
		switchTurn();
}

function takeField(x, y, player)
{
	if (x >= 25 && x <= 175)
	{
		if (y >= 25 && y <= 175)
		{
			if (fields[0] === 0)
			{
				fields[0] = player;
				drawSymbol();
			}
		}
		else if (y >= 225 && y <= 375)
		{
			if (fields[3] === 0)
			{
				fields[3] = player;
				drawSymbol();
			}
		}
		else if (y >= 425 && y <= 575)
		{
			if (fields[6] === 0)
			{
				fields[6] = player;
				drawSymbol();
			}
		}
	}
	else if (x >= 225 && x <= 375)
	{
		if (y >= 25 && y <= 175)
		{
			if (fields[1] === 0)
			{
				fields[1] = player;
				drawSymbol();
			}
		}
		else if (y >= 225 && y <= 375)
		{
			if (fields[4] === 0)
			{
				fields[4] = player;
				drawSymbol();
			}
		}
		else if (y >= 425 && y <= 575)
		{
			if (fields[7] === 0)
			{
				fields[7] = player;
				drawSymbol();
			}
		}
	}
	else if (x >= 425 && x <= 575)
	{
		if (y >= 25 && y <= 175)
		{
			if (fields[2] === 0)
			{
				fields[2] = player;
				drawSymbol();
			}
		}
		else if (y >= 225 && y <= 375)
		{
			if (fields[5] === 0)
			{
				fields[5] = player;
				drawSymbol();
			}
		}
		else if (y >= 425 && y <= 575)
		{
			if (fields[8] === 0)
			{
				fields[8] = player;
				drawSymbol();
			}
		}
	}
}

function checkMousePos(canvas, evt)
{
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

document.body.onmousedown = function(event) { 
	if (turn_tracker > 0) {
		++mouseDown[event.button];
		++mouseDownCount;
		
		if (mouseDownCount && turn_tracker > 0)
		{
			for (var i = 0; i < mouseDown.length; ++i)
			{
				if (mouseDown[i] && turn_tracker > 0)
				{
					// check coordinates here
					var pos = checkMousePos(canvas, event);
					if (pos.x < canvas.width && pos.y < canvas.height
						&& pos.x > 0 && pos.y > 0)
					{
						// third argument is player
						takeField(pos.x, pos.y, turn_tracker);
					}
				}
			}
		}
	}
}

document.body.onmouseup = function(event) {
	--mouseDown[event.button];
	--mouseDownCount;
}

// List of possible win conditions:
// [0][1][2] || horizontal top row
// [3][4][5] || horizontal mid row
// [6][7][8] || horizontal bot row
// [0][4][8] || vertical top to bot
// [0][3][6] || vertical left row
// [1][4][7] || vertical middle row
// [2][5][8] || vertical right row
// [2][4][6] || vertical bot to top

function checkWinCondition()
{	
	for (let x = 1; x < 3; x++)
	{
		if (fields[0] === x && fields[1] === x && fields[2] === x)
		{
			return x;
		}
		else if (fields[3] === x && fields[4] === x && fields[5] === x)
		{
			return x;
		}
		else if (fields[6] === x && fields[7] === x && fields[8] === x)
		{
			return x;
		}
		else if (fields[0] === x && fields[4] === x && fields[8] === x)
		{
			return x;
		}
		else if (fields[0] === x && fields[3] === x && fields[6] === x)
		{
			return x;
		}
		else if (fields[1] === x && fields[4] === x && fields[7] === x)
		{
			return x;
		}
		else if (fields[2] === x && fields[5] === x && fields[8] === x)
		{
			return x;
		}
		else if (fields[2] === x && fields[4] === x && fields[6] === x)
		{
			return x;
		}
	}
	// Are all fields taken and there's still no winner? That's a draw.
	var z = 0;
	for (let y = 0; fields[y] && y < 9; y++)
		z += 1;
	if (z === 9)
		return 3;
	return 0;
}

// Function to reset the game
function resetGame()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let x = 0; x < 9; x++)
		base_image[x].src = 0;
	base_image = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	mouseDown = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	mouseDownCount = 0;
	// Loser gets the first turn
	if (ttt_winner === 1)
		turn_tracker = 2;
	else 
		turn_tracker = 1;
	ttt_winner = 0;
	fields = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	rendered = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	animationId = requestAnimationFrame(draw);
}

// Function to end the game and display winner message
function endGame()
{
	context.fillStyle = "black";
	context.font = "40px Poppins";
	context.textAlign = "center";
	
	var lang = localStorage.getItem('language');
	if (lang === "de")
	{
		context.fillText('Spiel vorbei', canvas.width / 2, canvas.height / 2 - 40);
	}
	else if (lang === "it")
	{
		context.fillText('Fine del gioco', canvas.width / 2, canvas.height / 2 - 40);
	}
	else
	{
		context.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 40);
	}
	
	// Display the winner
	if (lang === "de")
	{
		
		if (ttt_winner === 3)
		{
			context.fillText(`Unentschieden`, canvas.width / 2, canvas.height / 2);
		}
		else
		{
			let winner = ttt_winner === 1 ? "Spieler 1" : "Spieler 2";
			context.fillText(`Sieger: ${winner}`, canvas.width / 2, canvas.height / 2);
		}
	}
	else if (lang === "it")
	{
		if (ttt_winner === 3)
		{
			context.fillText(`Nessuno vince`, canvas.width / 2, canvas.height / 2);
		}
		else
		{
			let winner = ttt_winner === 1 ? "Giocatore 1" : "Giocatore 2";
			context.fillText(`Vincitore: ${winner}`, canvas.width / 2, canvas.height / 2);
		}
	}
	else
	{
		if (ttt_winner === 3)
		{
			context.fillText(`Draw`, canvas.width / 2, canvas.height / 2);
		}
		else
		{
			let winner = ttt_winner === 1 ? "Player 1" : "Player 2";
			context.fillText(`Winner: ${winner}`, canvas.width / 2, canvas.height / 2);
		}
	}

	// Ask for replay or return to home
	context.font = "20px Poppins";
	if (lang === "de")
	{
		context.fillText('Drücke "R" für eine weitere Runde oder "H" zum Zurückkehren', canvas.width / 2, canvas.height / 2 + 40);
	}
	else if (lang === "it")
	{
		context.fillText('Premere "R" per una nuova partita o "H" per ritonare', canvas.width / 2, canvas.height / 2 + 40);
	}
	else
	{
		context.fillText('Press "R" to replay or "H" to go back to home', canvas.width / 2, canvas.height / 2 + 40);
	}
	
	// Add event listener for keydown events
	document.addEventListener("keydown", function (event)
	{
		if (event.key === "r")
		{
			window.location.reload();
			resetGame();
		}
		else if (event.key === "h")
		{
			// Go back to home
			window.location.href = "/games";
		}
	});
}

// Main game loop	// Consider adapting turn_tracker check!
function draw()
{
	ttt_winner = checkWinCondition();
	if (ttt_winner > 0)
	{
		turn_tracker = 0;
		endGame();
		return;
	}
	animationId = requestAnimationFrame(draw);
}

// Call the draw function to start the game loop
ttt_winner = 0;
base_image = [0, 0, 0, 0, 0, 0, 0, 0, 0];
mouseDown = [0, 0, 0, 0, 0, 0, 0, 0, 0];
mouseDownCount = 0;
fields = [0, 0, 0, 0, 0, 0, 0, 0, 0];
rendered = [0, 0, 0, 0, 0, 0, 0, 0, 0];
turn_tracker = 1;
let animationId = requestAnimationFrame(draw);
