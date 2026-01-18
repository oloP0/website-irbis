// ====== PYTANIA ======
let questions = [
    { q: "Ile palców ma gekon lamparci na każdej kończynie?", a: ["3", "4", "5", "6"], correct: 2, cat: "jaszczurki" },
    { q: "Jaki wąż jest najdłuższy na świecie?", a: ["Pyton siatkowy", "Kobra indyjska", "Boa dusiciel", "Mamba czarna"], correct: 0, cat: "wez" },
    { q: "Jak żółwie oddychają zimą pod lodem?", a: ["Przez skórę", "Przez kloakę", "Nie oddychają", "Przez pancerz"], correct: 1, cat: "zolwie" },
    { q: "Jak nazywa się największy gatunek krokodyla?", a: ["Nilowy", "Orinoko", "Rzekotny", "Słonowodny"], correct: 3, cat: "krokodyle" }
];

// ====== LOGIKA QUIZU ======
let selectedQuestions = [];
let current = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", () => location.reload());

function startQuiz() {
    const category = document.getElementById("category-select").value;
    selectedQuestions = category === "all" 
        ? questions.slice() 
        : questions.filter(q => q.cat === category);

    // Losowanie 30 pytań, jeśli jest mniej to wszystkie
    selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5).slice(0, 30);

    document.getElementById("start-box").classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");

    current = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    let q = selectedQuestions[current];
    document.getElementById("question-text").innerText = q.q;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.a.forEach((ans, i) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.addEventListener("click", () => checkAnswer(i));
        answersDiv.appendChild(btn);
    });

    nextBtn.classList.add("hidden");
}

function checkAnswer(i) {
    let q = selectedQuestions[current];
    const buttons = document.querySelectorAll("#answers button");

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.correct) btn.classList.add("correct");
        else if (index === i) btn.classList.add("wrong");
    });

    if (i === q.correct) score++;
    nextBtn.classList.remove("hidden");
}

function nextQuestion() {
    current++;
    if (current >= selectedQuestions.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}

function endQuiz() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("end-box").classList.remove("hidden");
    document.getElementById("score").innerText = `Zdobyłeś ${score} / ${selectedQuestions.length} punktów!`;
}
