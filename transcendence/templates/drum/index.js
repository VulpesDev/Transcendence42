const music = ["1","crash","kickbass", "snare", "tom1", "tom2", "tom3", "tom4"]

var numbers = document.querySelectorAll(".drum").length;
var crash = new Audio("sounds/crash.mp3");
var kickbass = new Audio("sounds/kick-bass.mp3");
var snare = new Audio("sounds/snare.mp3");
var tom1 = new Audio("sounds/tom-1.mp3");
var tom2 = new Audio("sounds/tom-2.mp3");
var tom3 = new Audio("sounds/tom-3.mp3");
var tom4 = new Audio("sounds/tom-4.mp3");

for(var i=0; i < numbers; i++){
  document.querySelectorAll(".drum")[i].addEventListener("click", function(event){
    buttonanimation(this.innerHTML)
    if(this.innerHTML == "w"){
      crash.play();
    }
    if(this.innerHTML == "a"){
      kickbass.play();
    }
    if(this.innerHTML == "s"){
      snare.play();
    }
    if(this.innerHTML == "d"){
      tom1.play();
    }
    if(this.innerHTML == "j"){
      tom2.play();
    }
    if(this.innerHTML == "k"){
      tom3.play();
    }
    if(this.innerHTML == "l"){
      tom4.play();
    }
  });
}
document.addEventListener("keypress", function(event){
  buttonanimation(event.key);

  if(event.key == "w"){
    crash.play();
  }
  if(event.key ==  "a"){
    kickbass.play();
  }
  if(event.key ==  "s"){
    snare.play();
  }
  if(event.key ==  "d"){
    tom1.play();
  }
  if(event.key ==  "j"){
    tom2.play();
  }
  if(event.key == "k"){
    tom3.play();
  }
  if(event.key ==  "l"){
    tom4.play();
  }
});

function buttonanimation(currentkey){
  var active = document.querySelector("."+currentkey);
  active.classList.add("pressed");
  setTimeout(function(){
    active.classList.remove("pressed")
  }, 100);

}
