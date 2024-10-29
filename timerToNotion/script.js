const countdownElement = document.getElementById("countdown");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");

let timer;
let isRunning = false;

countdownElement.addEventListener("blur", () => {
  const newTime = countdownElement.textContent.trim();
  if (/^\d{2}:\d{2}:\d{2}$/.test(newTime)) {
    if (isRunning) {
      clearInterval(timer);
      startTimer(newTime);
    } else {
      countdownElement.textContent = newTime; // Atualiza o contador com o novo tempo
    }
  } else {
    countdownElement.textContent = "00:00:00"; // Resetar se o formato estiver errado
  }
});

function startTimer(duration) {
  let [hours, minutes, seconds] = duration.split(":").map(Number);
  const countdown = () => {
    if (seconds === 0 && minutes === 0 && hours === 0) {
      clearInterval(timer);
      alert("Time's up!");
      isRunning = false;
      updateButton();
      return;
    }
    if (seconds === 0) {
      if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    countdownElement.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  timer = setInterval(countdown, 1000);
}

function updateButton() {
  if (isRunning) {
    startPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    startPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

startPauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  } else {
    startTimer(countdownElement.textContent.trim());
    isRunning = true;
  }
  updateButton();
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  countdownElement.textContent = "00:05:00"; // Resetar para o tempo inicial
  updateButton(); // Atualiza o botão para "play"
});
