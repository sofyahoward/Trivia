var currentIndex = 0;
var correctAnswer = null;
var timer = null;
var numOfCorrect = 0;
var numOfIncorrect = 0;
var questions = [
  {
    question: "Who is credited with founding the game of rugby?",
    a: "William Naismith",
    b: "William Webb Ellis",
    c: "Abner Doubleday",
    d: "Walter Camp",
    correct: "b"
  },
  {
    question: "In what country was rugby invented?",
    a: "New Zealand",
    b: "Finland",
    c: "South Africa",
    d: "England",
    correct: "d"
  },
  {
    question: "At what school was rugby first played?",
    a: "The Rugby School",
    b: "Harvard",
    c: "University of Oxford",
    d: "Sorbonne University",
    correct: "a"
  },
  {
    question: "Best player at the 2107 World Cup",
    a: "Richie McCaw",
    b: "Joma",
    c: "Gretzky",
    d: "Ichiro",
    correct: "a"
  },
  {
    question: "Number of players on a rugby team (Union Rules)",
    a: "5",
    b: "9",
    c: "11",
    d: "15",
    correct: "d"
  },
  {
    question: "Number of referees to officiate?",
    a: "1",
    b: "2",
    c: "4",
    d: "10,000",
    correct: "a"
  },
  {
    question: "Point per 'Try' '(i.e., touchdown)'?",
    a: "1",
    b: "2",
    c: "5",
    d: "6",
    correct: "c"
  }
];

function countDown() {
  timer = setInterval(function() {
    var current = parseInt($("#counter").text());
    if (current === 0) {
      currentIndex += 1;

      if (currentIndex === 7) {
        clearInterval(timer);
        let endGameText = `Game Over You Scored: ${$(
          "#score"
        ).text()} Correct Answers: ${numOfCorrect} Incorrect Answers: ${numOfIncorrect}`;
        $("#alert").text(endGameText);
        $("#question-area").css({ display: "none" });
        currentIndex = 0;
        return;
      }

      displayQuestion(currentIndex);
      $("#counter").text(paddTime(30));
    } else {
      $("#counter").text(paddTime(current - 1));
    }
  }, 1000);
}

function paddTime(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function displayQuestion(index) {
  var question = questions[index];
  correctAnswer = questions[index].correct;
  $("#question").text(question.question);
  $("#a").text(question.a);
  $("#b").text(question.b);
  $("#c").text(question.c);
  $("#d").text(question.d);
}

$("#start-btn").click(function() {
  $(".game-area").css({ display: "block" });
  $("#question-area").css({ display: "block" });
  $("#score").text(0);
  $("#alert").text("Select correct answer to earn points");
  numOfCorrect = 0;
  numOfIncorrect = 0;
  displayQuestion(currentIndex);
  countDown();
});

$(".answer-choice").click(function(e) {
  e.preventDefault();
  let id = e.target.id;
  console.log(`${id}`);
  console.log(correctAnswer);
  if (`${id}` === correctAnswer) {
    let currentScore = $("#score").text();
    $("#score").text(parseInt(currentScore) + 10);
    $("#alert").text("You Guessed Correctly");
    currentIndex += 1;
    numOfCorrect += 1;
    if (currentIndex === 7) {
      clearInterval(timer);
      let endGameText = `Game Over You Scored: ${$(
        "#score"
      ).text()} Correct Answers: ${numOfCorrect} Incorrect Answers: ${numOfIncorrect}`;
      $("#alert").text(endGameText);
      $("#question-area").css({ display: "none" });
      currentIndex = 0;
      return;
    }
    displayQuestion(currentIndex);
    $("#counter").text(paddTime(30));
  } else {
    $("#score").text(parseInt(currentScore) - 10);
    $("#alert").text("You Guessed Incorrectly, you obviously don't know rugby!");
    currentIndex += 1;
    numOfIncorrect += 1;
    if (currentIndex === 7) {
      clearInterval(timer);
      currentIndex = 0;
      let endGameText = `Game Over You Scored: ${$(
        "#score"
      ).text()} Correct Answers: ${numOfCorrect} Incorrect Answers: ${numOfIncorrect}`;
      $("#alert").text(endGameText);
      $("#question-area").css({ display: "none" });
      currentIndex = 0;
      return;
    }
    displayQuestion(currentIndex);
    $("#counter").text(paddTime(30));
  }
});
