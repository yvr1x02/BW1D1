window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const correctPercentage = urlParams.get("correct");
  const incorrectPercentage = urlParams.get("incorrect");

  const resultDiv = document.getElementById("results");
  const correctDiv = document.createElement("div");
  correctDiv.classList.add("correctdiv");
  const correctAnswer = document.createElement("p");
  correctAnswer.classList.add("correctP");
  const wrongDiv = document.createElement("div");
  wrongDiv.classList.add("wrongdiv");
  const wrongAnswer = document.createElement("p");
  wrongAnswer.classList.add("wrongP");

  correctAnswer.textContent = "Correct: " + correctPercentage + "%";
  correctDiv.appendChild(correctAnswer);
  resultDiv.appendChild(correctDiv);

  wrongAnswer.textContent = "Wrong: " + incorrectPercentage + "%";
  correctDiv.appendChild(wrongAnswer);

  const totalLength = 502.4;
  const correctLength = (correctPercentage / 100) * totalLength;
  const incorrectLength = (incorrectPercentage / 100) * totalLength;

  const correctCircle = document.getElementById("correctCircle");
  const incorrectCircle = document.getElementById("incorrectCircle");
  const correctText = document.getElementById("correctText");
  const wrongText = document.getElementById("incorrectText");
  const resultText = document.getElementById("resultText");

  correctCircle.setAttribute("stroke-dasharray", `${correctLength} ${totalLength}`);
  incorrectCircle.setAttribute("stroke-dasharray", `${incorrectLength} ${totalLength}`);
  incorrectCircle.setAttribute("stroke-dashoffset", -correctLength);

  if (correctPercentage > 60) {
    resultText.textContent = "Hai passato il test";
  } else {
    resultText.textContent = "Non hai superato il test";
  }
};
