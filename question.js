async function loadPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const qRes = await fetch("./data/questions.json");
  const questions = await qRes.json();

  const question = questions.find(q => q.id === id);

  const aRes = await fetch("./data/answers.json");
  const answers = await aRes.json();

  const questionContainer = document.getElementById("question-container");
  const answersContainer = document.getElementById("answers-container");

  // SHOW QUESTION
  questionContainer.innerHTML = `
    <div class="question-box">
      <h2 class="h4 text-primary">${question.title}</h2>
      <p class="text-light">${question.body}</p>
      <p class="text-secondary small">tags: ${question.tags.join(", ")}</p>
    </div>
  `;

  // SHOW ANSWERS
  const filteredAnswers = answers.filter(a => a.questionId === id);
  
  if (filteredAnswers.length === 0) {
    answersContainer.innerHTML = `<p class="text-muted">no answers yet</p>`;
    return;
  }

  filteredAnswers.forEach(a => {
    const div = document.createElement("div");
    div.className = "answer-box";

    div.innerHTML = `
      <div class="answer-author">user #${a.userId} said:</div>
      <div class="answer-body">${a.body}</div>
    `;

    answersContainer.appendChild(div);
   
  });
document.getElementById("submit-answer").onclick = () => {
  const text = document.getElementById("answer-input").value.trim();
  if (text.length === 0) return alert("answer cannot be empty");

  const newAnswer = {
    id: Date.now(),
    questionId: id,
    userId: 999, // guest user
    body: text
  };

  // Append the new answer to the DOM (client-side only)
  const added = document.createElement("div");
  added.className = "answer-box";
  added.innerHTML = `
    <div class="answer-author">user #${newAnswer.userId} said:</div>
    <div class="answer-body">${newAnswer.body}</div>
  `;
  answersContainer.appendChild(added);
  document.getElementById("answer-input").value = "";
};

}

function revealStaggered() {
  const items = document.querySelectorAll(
    ".question-box, .answer-box, .answer-form"
  );

  items.forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 120);
  });
}


loadPage();
revealStaggered();
