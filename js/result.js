window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const correctPercentage = urlParams.get("correct");
  const incorrectPercentage = urlParams.get("incorrect");

  const resultDiv = document.getElementById("results");
  const correctDiv = document.createElement("div");
  correctDiv.classList.add("correctdiv");
  const correctAnswer = document.createElement("p");
  const wrongDiv = document.createElement("div");
  wrongDiv.classList.add("wrongdiv");
  const wrongAnswer = document.createElement("p");

  correctAnswer.textContent = "Correct: " + correctPercentage + "%";
  correctDiv.appendChild(correctAnswer);
  resultDiv.appendChild(correctDiv);

  wrongAnswer.textContent = "Wrong: " + incorrectPercentage + "%";
  wrongDiv.appendChild(wrongAnswer);
  resultDiv.appendChild(wrongDiv);

  const totalLength = 503.0;
  const correctLength = (correctPercentage / 100) * totalLength;
  const incorrectLength = (incorrectPercentage / 100) * totalLength;

  const correctCircle = document.getElementById("correctCircle");
  const incorrectCircle = document.getElementById("incorrectCircle");

  correctCircle.setAttribute("stroke-dasharray", `${correctLength} ${totalLength}`);
  incorrectCircle.setAttribute("stroke-dasharray", `${incorrectLength} ${totalLength}`);
  incorrectCircle.setAttribute("stroke-dashoffset", -correctLength);
  const resultText = document.getElementById("resultText");

  if (correctPercentage > 60) {
    resultText.textContent = "Hai passato il test";
  } else {
    resultText.textContent = "Non hai superato il test";
  }
};
