const getUrlVar = new URLSearchParams(window.location.search);

const correctAnswer = getUrlVar.get("score");

console.log(correctAnswer);
