const quizData = [
  {
    question: "Comment s'appelle le robot à qui on donne les puces?",
    a: "BORG.L",
    b: "BURG.L",
    c: "BURG.M",
    d: "BORG.J",
    correct: "b",
  },
  {
    question: "Où se passe le jeu?",
    a: "Une patinoire",
    b: "Un beau jardin",
    c: "Un jardin dégueulasse",
    d: "Une chambre",
    correct: "c",
  },
  {
    question: "Quelle est la meilleure lance du jeu?",
    a: "Lance à épines",
    b: "Lance en branchette",
    c: "Lance en cocon",
    d: "Lance à dard",
    correct: "d",
  },
  {
    question: "Quel est le pire insecte?",
    a: "Araignée loup",
    b: "Fourmillion",
    c: "Coccinelle",
    d: "Scarabée boeuf",
    correct: "a",
  },
];

const body = document.querySelector("body");
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const heart1 = document.getElementById("heart1");
const heart2 = document.getElementById("heart2");
const heart3 = document.getElementById("heart3");

let currentQuiz = 0;
let score = 0;
let hp = 3;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  // check to see the answer
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
      currentQuiz++;
    } else {
      // On vérifie la vie du user en cas de mauvaise réponse et si il a plus de 1 hp on lui enlève 1 sinon il perd
      if (hp == 3) {
        heart3.style.display = "none";
        hp--;
      } else if (hp == 2) {
        heart2.style.display = "none";
        hp--;
      } else if (hp == 1) {
        heart1.style.display = "none";
        hp--;
        quiz.innerHTML = `
              <h2>Vous avez perdu! Votre score est de ${score}/${quizData.length}.</h2>
          
              <button onclick="location.reload()" class="buttonQuiz">Recommencer</button>
              `;
      }
    }
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
                      <h2>Tu as ${score}/${quizData.length}.</h2>
                      
                      <button onclick="location.reload()">Recommencer</button>
                  `;
    }
  }
});
