// alert("hey");
let gamePattern = [];
const buttoncolors = ["red", "blue", "green", "yellow"];
let userPattern = [];
let level = 0;
let started = false;

//start game
$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
const startOver = function () {
  level = 0;
  gamePattern = [];
  started = false;
};
const checkAnswer = function (curLevel) {
  if (gamePattern[curLevel] === userPattern[curLevel]) {
    if (userPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
};

$(".btn").click(function () {
  //select id of the current button clicked
  let userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userPattern.length - 1);
});

const playSound = function (name) {
  //play audio
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

const nextSequence = function () {
  userPattern = [];
  level++;
  let randomNum = Math.trunc(Math.random() * 4);
  let randomChosenColor = buttoncolors[randomNum];
  gamePattern.push(randomChosenColor);
  $("#level-title").text(level);
  //animation using jquery
  //choosing id like this
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
};

//animate on pressing a button
const animatePress = function (curColour) {
  $("#" + curColour).addClass("pressed");

  //remove the added class after 100ms
  setTimeout(function () {
    $("#" + curColour).removeClass("pressed");
  }, 100);
};
