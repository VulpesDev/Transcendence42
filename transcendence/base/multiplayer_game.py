from channels.generic.websocket import WebsocketConsumer
import json

class GameConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json['type']
        if message_type == 'player_move':
            # Handle player move logic
            pass
        elif message_type == 'chat_message':
            # Handle chat message logic
            pass
        # Add more message types as needed