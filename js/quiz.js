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

function shuffle(array) {
  //randomizer domande
  for (let index = array.length - 1; index > 0; index--) {
    const random = Math.floor(Math.random() * (index + 1));
    [array[index], array[random]] = [array[random], array[index]];
  }
  return array;
}

function loadQuestion(index) {
  //caricamento domande
  const question = questions[index]; //prendo domanda dall array
  const questionContainer = document.querySelector(".question"); //creo variabile per il div
  const questionTitle = questionContainer.querySelector("h3"); //creo variabile per l h3
  const answersList = questionContainer.querySelector(".answers"); //creo variabile per la lista risposta
  questionTitle.textContent = question.question; // prendo titolo e lo setto alla variabile
  answersList.innerHTML = ""; // Resetta le risposte
  const allAnswers = [question.correct_answer, ...question.incorrect_answers];
  shuffle(allAnswers); // Mescola le risposte
  allAnswers.forEach((answer) => {
    //per ogni risposta creo:
    const answerItem = document.createElement("li"); // creo lista
    const answerLabel = document.createElement("label"); //creo label ( "contenitore" risposta)
    const answerInput = document.createElement("input");
    if (question.type === "multiple") {
      answerInput.type = "radio";
    } else {
      answerInput.type = "checkbox";
    }
    answerInput.name = "answer";
    answerInput.value = answer;
    answerLabel.appendChild(answerInput);
    answerLabel.appendChild(document.createTextNode(answer));
    answerItem.appendChild(answerLabel);
    answersList.appendChild(answerItem);
  });
  questionContainer.classList.remove("hidden");
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) return null;
  return selectedAnswer.value;
}

function showNextQuestion() {
  const answer = checkAnswer();
  if (answer === null) {
    alert("Per favore, seleziona una risposta.");
    return;
  }
  const currentQuestionContainer = document.querySelector(".question");
  currentQuestionContainer.classList.add("hidden");
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    const score = checkScore();
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = `Hai risposto correttamente a ${score} domande su ${questions.length}.`;
  }
}

function checkScore() {
  let score = 0;
  questions.slice(0, currentQuestionIndex + 1).forEach((question, index) => {
    const selectedAnswer = document.querySelector(`input[name="answer"]:checked`);
    if (selectedAnswer && selectedAnswer.value === question.correct_answer) {
      score++;
    }
  });
  return score;
}

window.onload = function () {
  loadQuestion(currentQuestionIndex);
  document.getElementById("next-button").addEventListener("click", showNextQuestion);
  startTimer();
};
