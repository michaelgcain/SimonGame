var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

// Upon pressing any key, it will be determined whether the game has been started yet.
// If it has not yet been started, The H1 instructions are now changed to "Level 0" and after 1.5 seconds nextSequence will run.
$(document).on("keypress", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    setTimeout(function() {
      nextSequence();
    }, 1200);
    started = true;
  };
});

// Upon click, the button is animated and its corresponding sound is played. The button's color is also added to the User's array.
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1); //Current last color/click compared with same point in gamePattern array.
});

// Random number is generated and this number's button's audio is played.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
};

// User's button choice's audio is played.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// Button flashes when user clicks on it.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over. Press Any Key to Restart.");
    startOver();
  };

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (currentLevel === (gamePattern.length - 1)) {
      console.log("Turn Finished")
      setTimeout(function() {
        nextSequence();
      }, 1200);
      userClickedPattern = [];
    };
  };
};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};
