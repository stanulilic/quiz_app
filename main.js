const nextBtn = document.querySelector(".btn-next");
const prevBtn = document.querySelector(".btn-prev");
const quizWrapper = document.querySelector(".quiz");
const progressBar = document.querySelector("progress");

let questionCount = 1;
let totalScore = 0;

const questions = [
  {
    question: "Who directed Avengers Endgame?",
    choices: [
      "Mark Ruffalo",
      "The Russo Brothers",
      "Samuel L Jackson",
      "Christopher Nolan"
    ],
    answer: 1,
    userAnswer: null
  },
  {
    question: "Who directed the Titanic Movie?",
    choices: [
      "David Cameron",
      "Jamie Foxx",
      "The Russo Brothers",
      "Taika Watiti"
    ],
    answer: 0,
    userAnswer: null
  },
  {
    question: "Who directed  The Dark Knight?",
    choices: [
      "Steven Spielberg",
      "Brad Cooper",
      "Mel Gibson",
      "Christopher Nolan"
    ],
    answer: 4,
    userAnswer: null
  },
  {
    question: "Who plays Black Widow in Avengers?",
    choices: [
      "Emily Brunt",
      "Sandra Bullock",
      "Scarlet Johannson",
      "Angelina Jolie"
    ],
    answer: 3,
    userAnswer: null
  }
];

progressBar.max = questions.length;

function renderQuestion(quiz, questionNumber) {
  const markup = `
<div class="quiz__data" id=${questionNumber}>
 <p class="quiz__tracker">Question ${questionCount} of ${questions.length}</p>
<div class="quiz__container">
<h1  class="quiz__question">
${quiz.question}
</h1>
<form class="quiz__choices">
${quiz.choices
  .map(
    (choice, i) => `<p>
    <input type="radio" id=${i} name="answers" value="${choice}">
    <label for="choice">${choice}</label>
    </p> `
  )
  .join("")}
</form>
</div>
</div>
    `;
  quizWrapper.insertAdjacentHTML("afterbegin", markup);
}

// show the first question
renderQuestion(questions[0], 0);

function showWarning() {
  const messageElement = document.querySelector("p.warning");
  // if message already exists
  if (messageElement) {
    return "warning already exists";
  }
  const choicesForm = document.querySelector(".quiz__choices");
  const message = '<p class="warning">Please choose an answer!</p>';
  choicesForm.insertAdjacentHTML("beforeend", message);
  return "show warning";
}

function showProgress(question) {
  progressBar.value = question;
}

nextBtn.addEventListener("click", () => {
  const quizData = document.querySelector(".quiz__data");
  const chosenAnswer = document.querySelector('input[type="radio"]:checked');
  let enteredAnswer;
  let currentQuestion = Number(quizData.id);
  currentQuestion += 1;
  questionCount += 1;
  if (currentQuestion === questions.length) {
    console.log("it is done");
  } else {
    enteredAnswer = chosenAnswer ? Number(chosenAnswer.id) : showWarning();

    // if no option is checked, show warning message and return
    if (
      enteredAnswer === "show warning" ||
      enteredAnswer === "warning already exists"
    ) {
      return;
    }
    questions[currentQuestion - 1].userAnswer = enteredAnswer;

    quizData.remove();
    renderQuestion(questions[currentQuestion], currentQuestion);

    // if answer was already chosen
    if (questions[currentQuestion].userAnswer !== null) {
      const chosenField = document.querySelector(
        `input[id="${questions[currentQuestion].userAnswer}"`
      );
      chosenField.checked = true;
    }
    showProgress(currentQuestion);
  }
});

prevBtn.addEventListener("click", () => {
  const quizData = document.querySelector(".quiz__data");
  const currentQuestion = Number(quizData.id);
  const previousQuestion = currentQuestion - 1;
  questionCount -= 1;
  quizData.remove();
  renderQuestion(questions[previousQuestion], previousQuestion);
  showProgress(previousQuestion);
  const chosenField = document.querySelector(
    `input[id="${questions[previousQuestion].userAnswer}"`
  );
  chosenField.checked = true;
});
