//simple quiz using focusing on the concept of function constructor, and prototype chain , callback function, closure , and also IIFE
(function () {
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  Question.prototype.displayQuestion = function () {
    console.log(this.question);
    for (var i = 0; i < this.answers.length; i++) {
      console.log(i + ": " + this.answers[i]);
    }
  };

  Question.prototype.correctAns = function (ans, callback) {
    let sc;
    if (ans === this.correct) {
      console.log("Correct answer");
      sc = callback(true);
    } else {
      console.log("Wrong answer");
      sc = callback(false);
    }
    this.displayScore(sc);
  };

  Question.prototype.displayScore = function (score) {
    console.log("current score is " + score);
  };

  const q1 = new Question(
    "What's the height of MT.Everest?",
    [8848, 8838, 8868],
    0
  );

  const q2 = new Question(
    "Which is longest bridge of Nepal?",
    ["Narayani", "koshi", "kankai", "karnali"],
    3
  );

  const q3 = new Question(
    "Who is the tallest person of Nepal?",
    ["Ram", "Hari", "Chandra Bdr", "Khagendra"],
    2
  );

  const questions = [q1, q2, q3];

  function score() {
    let score = 0;
    return function (correct) {
      if (correct) {
        score++;
      }
      return score;
    };
  }

  const keepScore = score();

  function nextQuestion() {
    const n = Math.floor(Math.random() * questions.length);
    questions[n].displayQuestion();

    const answer = prompt("Please give the correct answer");

    if (answer !== "exit") {
      questions[n].correctAns(parseInt(answer), keepScore);
      nextQuestion();
    }
  }
  nextQuestion();
})();
