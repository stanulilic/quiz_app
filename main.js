var quizContainer = document.querySelector(".quiz__container");

const questions = [
  {
    question: "Who directed Avengers Endgame?",
    choices: [
      "Mark Ruffalo",
      "The Russo Brothers",
      "Samuel L Jackson",
      "Christopher Nolan"
    ],
    answer: 1
  },
  {
    question: "Who directed the Titanic Movie?",
    choices: [
      "David Cameron",
      "Jamie Foxx",
      "The Russo Brothers",
      "Taika Watiti"
    ],
    answer: 0
  },
  {
    question: "Who directed  The Dark Knight?",
    choices: [
      "Steven Spielberg",
      "Brad Cooper",
      "Mel Gibson",
      "Christopher Nolan"
    ],
    answer: 4
  },
  {
    question: "Who plays Black Widow in Avengers?",
    choices: [
      "Emily Brunt",
      "Sandra Bullock",
      "Scarlet Johannson",
      "Angelina Jolie"
    ],
    answer: 3
  }
];

function renderQuestion(quiz) {
  const markup = `
<h1  class="quiz__question">
${quiz.question}
</h1>
<form class="quiz__choices">
${quiz.choices.map((choice) =>  `<p>
    <input type="radio" id="choice" name="answers">
    <label for="choice">${ choice }</label>
    </p> `).join('')}
</form>
    `;
    quizContainer.insertAdjacentHTML('beforeend', markup);
}

renderQuestion(questions[0]);