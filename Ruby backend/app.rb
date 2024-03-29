
require 'sinatra'
require 'sinatra-websocket'
require 'thin'


set :port, 8080
set :bind, '0.0.0.0'
set :server, 'thin'
set :sockets, []
set :public_folder, 'public'

get '/' do
  if !request.websocket?
    # erb :index
    File.read(File.join('public', 'index.html'))
  else
    # request.websocket do |ws|
    #   ws.onopen do
    #     ws.send("Hello World!")
    #     settings.sockets << ws
    #   end
    #   ws.onmessage do |msg|
    #     EM.next_tick { settings.sockets.each{|s| s.send(msg) } }
    #   end
    #   ws.onclose do
    #     warn("websocket closed")
    #     settings.sockets.delete(ws)
    #   end
    # end
  end
end

__END__
@@ index
<html>
  <body>
     <h1>Simple Echo & Chat Server</h1>
     <form id="form">
       <input type="text" id="input" value="send a message"></input>
     </form>
     <div id="msgs"></div>
  </body>

  <script type="text/javascript">
    window.onload = function(){
      (function(){
        var show = function(el){
          return function(msg){ el.innerHTML = msg + '<br />' + el.innerHTML; }
        }(document.getElementById('msgs'));

        var ws       = new WebSocket('ws://' + window.location.host + window.location.pathname);
        ws.onopen    = function()  { show('websocket opened'); };
        ws.onclose   = function()  { show('websocket closed'); }
        ws.onmessage = function(m) { show('websocket message: ' +  m.data); };

        var sender = function(f){
          var input     = document.getElementById('input');
          input.onclick = function(){ input.value = "" };
          f.onsubmit    = function(){
            ws.send(input.value);
            input.value = "send a message";
            return false;
          }
        }(document.getElementById('form'));
      })();
    }
  </script>
</html>
