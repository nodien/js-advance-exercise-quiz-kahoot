const quizData = [
    {
        question: "2 + 2 bằng mấy?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "Hà Nội là thủ đô của nước nào?",
        options: ["Thái Lan", "Trung Quốc", "Việt Nam", "Lào"],
        correctAnswer: "Việt Nam"
    },
    {
        question: "JavaScript là gì?",
        options: ["Một ngôn ngữ lập trình", "Hệ điều hành", "Phần mềm", "Trình duyệt"],
        correctAnswer: "Một ngôn ngữ lập trình"
    },
    {
        question: "Thủ đô của Nhật Bản là?",
        options: ["Kyoto", "Osaka", "Tokyo", "Hokkaido"],
        correctAnswer: "Tokyo"
    },
    {
        question: "HTML viết tắt của?",
        options: [
            "HyperText Makeup Language",
            "HyperText Markup Language",
            "Home Tool Mark Language",
            "Hyperlink and Text Markup Language"
        ],
        correctAnswer: "HyperText Markup Language"
    }
];

let shuffledQuestions;
let currentQuestion = 0;
let score = 0;
let shuffledAnswerTexts = [];

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");

resetBtn.style.display = "none";

//Fisher-Yates shuffle
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function startQuiz() {
    shuffledQuestions = shuffleArray(quizData);
    currentQuestion = 0;
    score = 0;
    renderQuestion();
}

function renderQuestion() {
    feedback.textContent = "";
    nextBtn.style.display = "none";
    resetBtn.style.display = "none";
    optionsContainer.innerHTML = "";

    const current = shuffledQuestions[currentQuestion];
    const progressText = `(${currentQuestion + 1} / ${shuffledQuestions.length})`;
    questionText.textContent = `Câu hỏi ${currentQuestion + 1}: ${current.question} ${progressText}`;

    shuffledAnswerTexts = shuffleArray(current.options);

    for (let i = 0; i < shuffledAnswerTexts.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = shuffledAnswerTexts[i];
        btn.classList.add("option");
        btn.addEventListener("click", () => checkAnswer(shuffledAnswerTexts[i], btn));
        optionsContainer.appendChild(btn);
    }
}

function checkAnswer(selectedText, button) {
    const correctText = shuffledQuestions[currentQuestion].correctAnswer;
    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(btn => btn.disabled = true);

    if (selectedText === correctText) {
        button.classList.add("correct");
        feedback.textContent = "🎉 Chính xác!";
        score++;
    } else {
        button.classList.add("wrong");
        allOptions.forEach(btn => {
            if (btn.textContent === correctText) {
                btn.classList.add("correct");
            }
        });
        feedback.textContent = "❌ Sai rồi!";
    }

    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
        renderQuestion();
    } else {
        showResult();
    }
});

resetBtn.addEventListener("click", () => {
    startQuiz();
});

function showResult() {
    questionText.textContent = "🎯 Bạn đã hoàn thành bài quiz!";
    optionsContainer.innerHTML = "";
    feedback.innerHTML = `✅ Điểm số của bạn: <strong>${score}/${shuffledQuestions.length}</strong>`;
    nextBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
}


startQuiz();
