const nextBtn = document.querySelector('.btn-next');
const quizWrapper = document.querySelector('.quiz');

let questionCount = 1;
let index = 0;
let totalScore = 0;

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

nextBtn.addEventListener('click', () => {
  const quizData = document.querySelector('.quiz__data');
  const chosenAnswer = document.querySelector('input[type="radio"]:checked').id;
  const currentQuestion = Number(quizData.id);
  const chosenAnswerNum = Number(chosenAnswer);

  // increment with 1 to get the next question from array
  index += 1;

  if ((index < questions.length && questionCount !== questions.length)) {
    questionCount += 1;
    // remove current question
    quizData.remove();
    renderQuestion(questions[index], index);
    // check if selected value equals to the question answer
    if (chosenAnswerNum === questions[currentQuestion].answer) {
      totalScore += 1;
    }
  }
});


// option 2
// get the select answer
// grab the question id from html
// compare if selectedAnswer == questions[questionid].answer
// if true
// increment totalScore
// else
 