const ws = new WebSocket("ws://localhost:8000/ws/game/");

ws.onopen = function () {
  console.log("WebSocket connection established.");
};

ws.onmessage = function (event) {
  const message = JSON.parse(event.data);
  // Handle received messages
};

function sendPlayerMove(move) {
  const message = {
    type: "player_move",
    move: move,
  };
  ws.send(JSON.stringify(message));
}

function sendChatMessage(message) {
  const message = {
    type: "chat_message",
    message: message,
  };
  ws.send(JSON.stringify(message));
}
