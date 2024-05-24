const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let currentQuestionIndex = 0;
let correctanswer = 0;

function shuffle(array) {
  //randomizer domande
  for (let index = array.length - 1; index > 0; index--) {
    const random = Math.floor(Math.random() * (index + 1));
    [array[index], array[random]] = [array[random], array[index]];
  }
  return array;
}

function loadQuestion(index) {
  const question = questions[index]; // prendo domanda singola
  const questionContainer = document.querySelector(".question"); // prendo il container
  const questionTitle = questionContainer.querySelector("h3"); // prendo il testo
  const answersList = questionContainer.querySelector(".answers"); // prendo la posizione per le risposte
  questionTitle.textContent = question.question; //assegno a question la domanda
  answersList.innerHTML = ""; // svuoto le risposte
  const allAnswers = [question.correct_answer, ...question.incorrect_answers]; //creo un array prendendo risposte corrette e errate
  shuffle(allAnswers); // sfrutto la funzione precedentemente creata per randomizzare la posizione delle risposte
  allAnswers.forEach((answer) => {
    // per ogni risposta dall array contentente tutte le risposte
    const answerItem = document.createElement("div"); // creo un div contenitore per la risposta
    const answerLabel = document.createElement("label"); //creo un label che contiene il testo
    answerItem.classList.add("answer-container"); // aggiungo classe al div
    answerLabel.classList.add("answer-label"); //  aggiungo  classe al label
    answerLabel.textContent = answer; // aggiungo il testo della risposta nel label
    answerLabel.addEventListener("click", () => {
      selectAnswer(answerLabel); //non appena clicco sulla risposta l'evidenzio e la seleziono
    });
    answerItem.appendChild(answerLabel); // appendo la risposta al div
    answersList.appendChild(answerItem); // appendo il div della risposta singola al div container
  });
  questionContainer.classList.remove("hidden"); //rimuovo la classe hidden per mostrare a schermo la domanda

  const questionCounter = document.querySelector(".questionCounter");
  questionCounter.innerHTML = `Domanda ${index + 1} <span class = "question-count"> / ${
    questions.length
  }</span> `;
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  clearInterval(timerInterval);
  startTimer();
  remainingPathColor = COLOR_CODES.info.color;
  document.getElementById("base-timer-path-remaining").classList.remove("red", "orange");
  document.getElementById("base-timer-path-remaining").classList.add(remainingPathColor);
}
function selectAnswer(answerLabel) {
  const selectedAnswers = document.querySelectorAll(".selected"); // prendo tutti gli elementi contenenti .selected
  selectedAnswers.forEach((item) => {
    // per ogni elemento selezionato rimuovo la classe selected
    item.classList.remove("selected");
  });
  answerLabel.classList.add("selected"); // aggiungo la classe all'elemento selezionato
}

function checkAnswer() {
  const selectedAnswer = document.querySelector(".selected"); // prendo l'elemento selezionato
  if (!selectedAnswer) return null; //se l'elemento non è selezionato ritorna null
  return selectedAnswer.textContent; // se è selezionato ritorna il suo testo
}

function showNextQuestion() {
  const answer = checkAnswer();
  if (answer === null) {
    return;
  }

  const currentQuestion = questions[currentQuestionIndex]; //prendo la domanda corrente
  if (answer === currentQuestion.correct_answer) {
    // se la risposta è uguale a quella esatta
    correctanswer++; // aggiungi 1 al counter
  }

  const currentQuestionContainer = document.querySelector(".question"); // prendo l'elemento con classe .question
  currentQuestionContainer.classList.add("hidden"); //aggiungo la classe hidden
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    //se l'index è minore degli elementi dell array stampa un altra domanda
    loadQuestion(currentQuestionIndex);
  } else {
    showResult(); //altrimenti visualizza i risultati
  }
}

function showResult() {
  const totalQuestions = questions.length;
  const percentageCorrect = (correctanswer / totalQuestions) * 100;
  const percentageIncorrect = 100 - percentageCorrect;
  const resultPageURL = `Result.html?correct=${percentageCorrect}&incorrect=${percentageIncorrect}`;
  window.location.href = resultPageURL;
}

window.onload = function () {
  loadQuestion(currentQuestionIndex);
  document.getElementById("next-button").addEventListener("click", showNextQuestion);
};

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = "green";

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: 10,
  },
  alert: {
    color: "red",
    threshold: 5,
  },
};

const FULL_DASH_ARRAY = 283;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
</div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
  showNextQuestion(loadQuestion());
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  const pathElement = document.getElementById("base-timer-path-remaining");

  if (timeLeft <= alert.threshold) {
    pathElement.classList.remove(warning.color);
    pathElement.classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    pathElement.classList.remove(info.color);
    pathElement.classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
