const countdownElement = document.getElementById("countdown");
const timeInput = document.getElementById("timeInput");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let timer;

timeInput.addEventListener("input", () => {
  const newTime = timeInput.value;
  if (/^\d{2}:\d{2}:\d{2}$/.test(newTime)) {
    countdownElement.textContent = newTime;
  }
});

function startTimer(duration) {
  let [hours, minutes, seconds] = duration.split(":").map(Number);
  const countdown = () => {
    if (seconds === 0 && minutes === 0 && hours === 0) {
      clearInterval(timer);
      alert("Time's up!"); // Adicionando alerta
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

startBtn.addEventListener("click", () => {
  clearInterval(timer);
  startTimer(timeInput.value);
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timeInput.value = "00:05:00"; // Resetar para o tempo inicial
  countdownElement.textContent = "05:00"; // Resetar visualmente
});
