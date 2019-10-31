const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
const quizWrapper = document.querySelector('.quiz');
const progressBar = document.querySelector('progress');

let questionCount = 1;
let totalScore = 0;
// store true if correct answer, false if wrong answer
const userAnswers = [];

const questions = [
  {
    question: 'Who directed Avengers Endgame?',
    choices: [
      'Mark Ruffalo',
      'The Russo Brothers',
      'Samuel L Jackson',
      'Christopher Nolan',
    ],
    answer: 1,
  },
  {
    question: 'Who directed the Titanic Movie?',
    choices: [
      'David Cameron',
      'Jamie Foxx',
      'The Russo Brothers',
      'Taika Watiti',
    ],
    answer: 0,
  },
  {
    question: 'Who directed  The Dark Knight?',
    choices: [
      'Steven Spielberg',
      'Brad Cooper',
      'Mel Gibson',
      'Christopher Nolan',
    ],
    answer: 4,
  },
  {
    question: 'Who plays Black Widow in Avengers?',
    choices: [
      'Emily Brunt',
      'Sandra Bullock',
      'Scarlet Johannson',
      'Angelina Jolie',
    ],
    answer: 3,
  },
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
    </p> `,
    )
    .join('')}
</form>
</div>
</div>
    `;
  quizWrapper.insertAdjacentHTML('afterbegin', markup);
}

// show the first question
renderQuestion(questions[0], 0);

function showWarning() {
  const messageElement = document.querySelector('p.warning');
  // if message already exists
  if (messageElement) {
    return;
  }
  const choicesForm = document.querySelector('.quiz__choices');
  const message = '<p class="warning">Please choose an answer!</p>';
  choicesForm.insertAdjacentHTML('beforeend', message);
}

function showProgress(question) {
  progressBar.value = question;
}

nextBtn.addEventListener('click', () => {
  const quizData = document.querySelector('.quiz__data');
  const chosenAnswer = document.querySelector('input[type="radio"]:checked');
  let currentQuestion = Number(quizData.id);
  let chosenAnswerNum = null;

  if (chosenAnswer) {
    chosenAnswerNum = Number(chosenAnswer.id);
  } else {
    showWarning();
    return;
  }

  if (chosenAnswerNum === questions[currentQuestion].answer) {
    totalScore += 1;
    userAnswers.push({
      [`question ${currentQuestion + 1}`]: true,
      selectedChoice: chosenAnswerNum,
    });
  } else {userAnswers.push({
    [`question ${currentQuestion + 1}`]: false,
    selectedChoice: chosenAnswerNum,
  });}

  if (currentQuestion === questions.length - 1) {
    console.log('quiz is finished');
  } else {
    // remove current question
    quizData.remove();
    questionCount += 1;
    currentQuestion += 1;
    renderQuestion(questions[currentQuestion], currentQuestion);
    showProgress(currentQuestion);
  }
});

prevBtn.addEventListener('click', () => {
  const quizData = document.querySelector('.quiz__data');
  const currentQuestion = Number(quizData.id);
  const previousQuestion = currentQuestion - 1;
  questionCount -= 1;
  quizData.remove();
  renderQuestion(questions[previousQuestion], previousQuestion);
  const chosenField = document.querySelector(`input[id="${userAnswers[previousQuestion].selectedChoice}"]`);
  chosenField.checked = true;
});
