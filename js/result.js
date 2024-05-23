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

  correctAnswer.textContent = "Correct Answers: " + correctPercentage + "%";
  correctDiv.appendChild(correctAnswer);
  resultDiv.appendChild(correctDiv);

  wrongAnswer.textContent = "Wrong Answers: " + incorrectPercentage + "%";
  wrongDiv.appendChild(wrongAnswer);
  resultDiv.appendChild(wrongDiv);
  const totalLength = 502.4;

  const correctCircle = document.getElementById("correctCircle");
  const incorrectCircle = document.getElementById("incorrectCircle");

  const correctOffset = totalLength * ((100 - correctPercentage) / 100);
  const incorrectOffset = totalLength * ((100 - incorrectPercentage) / 100);

  correctCircle.setAttribute("stroke-dashoffset", correctOffset);
  correctCircle.setAttribute("stroke", "#36A2EB");
  incorrectCircle.setAttribute("stroke-dashoffset", incorrectOffset);
  incorrectCircle.setAttribute("stroke", "#FF6384");

  console.log(correctCircle);
  console.log(incorrectCircle);
  console.log(correctOffset);
  console.log(incorrectOffset);
  console.log(correctPercentage);
  console.log(incorrectPercentage);
};
