document.getElementById("startQuiz").addEventListener("click", startQuiz);
document.getElementById("downloadResult").addEventListener("click", downloadResult);

const questions = [
  "Does {partnerName} support your goals and dreams? 💪",
  "Does {partnerName} value your opinion? 🤔",
  "Does {partnerName} make you laugh often? 😂",
  "Does {partnerName} help you grow as a person? 🌱",
  "Does {partnerName} apologize when they are wrong? 🙏",
  "Does {partnerName} make you feel appreciated? 🥰",
  "Does {partnerName} communicate openly and honestly? 🗣️",
  "Does {partnerName} show affection in ways you enjoy? 💖",
  "Is {partnerName} supportive of your hobbies and passions? 🎨",
  "Does {partnerName} handle disagreements maturely? 🤝",
  "Does {partnerName} respect your boundaries? 🚧",
  "Does {partnerName} make time for you when needed? ⏰",
  "Does {partnerName} celebrate your achievements? 🎉",
  "Does {partnerName} respect your personal space? 🏠",
];

let currentQuestionIndex = 0;
let redFlagScore = 0;
let greenFlagScore = 0;
let quizTaker = '';
let partnerName = '';
const totalQuestions = questions.length;

function startQuiz() {
  // Collect input names and show quiz
  const maleName = document.getElementById("maleName").value;
  const femaleName = document.getElementById("femaleName").value;
  quizTaker = document.getElementById("quizTaker").value;
  
  if (!maleName || !femaleName) {
    alert("Please enter both names to start the quiz!");
    return;
  }

  // Set partnerName dynamically based on who is taking the quiz
  partnerName = quizTaker === "male" ? femaleName : maleName;

  // Shuffle questions to display in random order
  shuffleQuestions();

  document.getElementById("coupleInfo").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("progress").style.display = "block";

  // Show first question
  showNextQuestion();
}

function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
}

function showNextQuestion() {
  if (currentQuestionIndex >= totalQuestions) {
    showResult();
    return;
  }

  const questionText = questions[currentQuestionIndex].replace("{partnerName}", partnerName);
  const questionContainer = document.getElementById("quiz");
  questionContainer.innerHTML = `
    <h2>${questionText}</h2>
    <button onclick="answerQuestion(true)">💚 Green Flag</button>
    <button onclick="answerQuestion(false)">🚩 Red Flag</button>
  `;

  updateProgressBar();

  currentQuestionIndex++;
}

function answerQuestion(isGreenFlag) {
  if (isGreenFlag) {
    greenFlagScore++;
  } else {
    redFlagScore++;
  }

  showNextQuestion();
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.querySelector(".result").style.display = "block";
  document.getElementById("progress").style.display = "none";

  const total = greenFlagScore + redFlagScore;
  const greenPercent = (greenFlagScore / total) * 100;
  const redPercent = (redFlagScore / total) * 100;

  document.getElementById("greenBar").style.width = `${greenPercent}%`;
  document.getElementById("redBar").style.width = `${redPercent}%`;

  const percentageText = `${partnerName} is ${greenPercent.toFixed(2)}% Green Flag 🌿 and ${redPercent.toFixed(2)}% Red Flag 🚩!`;
  document.getElementById("percentage").innerText = percentageText;
}

function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function downloadResult() {
  const canvas = document.getElementById("resultCanvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions and design
  canvas.width = 500;
  canvas.height = 300;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add text and result
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "#000";
  ctx.fillText("Red Flag or Green Flag Quiz", 20, 40);
  ctx.fillText(`Result: ${document.getElementById("percentage").innerText}`, 20, 100);

  // Convert canvas to image and trigger download
  const link = document.createElement("a");
  link.download = "relationship-result.png";
  link.href = canvas.toDataURL();
  link.click();
}

// Share Button Logic
document.getElementById("shareResult").addEventListener("click", () => {
  const shareData = {
    title: "Red Flag or Green Flag Quiz Result",
    text: `${document.getElementById("percentage").innerText}`,
    url: window.location.href
  };
  
  if (navigator.share) {
    navigator.share(shareData).then(() => {
      console.log("Sharing successful!");
    }).catch(err => {
      console.error("Error sharing:", err);
    });
  } else {
    alert("Sharing is not supported on your browser.");
  }
});
