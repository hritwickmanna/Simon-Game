var buttonColors = ["red","green","blue","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 1;
var startedTotoggle =true;

//start keypress
$(document).keypress(function(){
  if(startedTotoggle){
  nextSequence();
  startedTotoggle=false;
  }
});

//button clicked by user and storing till it gets correct
$(".btn").on("click",function()  {
  // var userChosenColour = this.id;
  var userChosenColour = $(this).attr("id"); //yaha galti hui
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatepress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//check the pattern
function checkAnswer(currentLevel)  {
//yaha galti ki logic meh
if(userClickedPattern[currentLevel] === gamePattern[currentLevel] ){
  console.log("sucess");
  if(userClickedPattern.length === gamePattern.length)  {
  setTimeout(function(){nextSequence();},1000); }
}

else  {
  console.log("wrong");

  $("body").addClass("game-over");
  playSound("wrong");
  setTimeout(function(){
  $("body").removeClass("game-over")},200);
  $("#level-title").text("Game Over, Press Any Key to Restart");

  startOver();
  }

}

//start again
function startOver()  {

gamePattern = [];
userClickedPattern = [];

level = 1;
startedTotoggle =true;

}

// adding color to gamePattern
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  $("#level-title").text("level "+level);
  level++;
}


//sound of following buttons
function playSound(name)  {
  var audio = new Audio("sounds/" + name+ ".mp3");
  audio.play();
}

//animation to pressed button
function animatepress(currentColor){
$("#" + currentColor).addClass("pressed");
setTimeout(function(){
$("#" + currentColor).removeClass("pressed");},100);
}
