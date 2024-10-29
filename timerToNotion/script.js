const countdownElement = document.getElementById("countdown");
const timeInput = document.getElementById("timeInput");

timeInput.addEventListener("input", () => {
  const newTime = timeInput.value;
  if (/^\d{2}:\d{2}:\d{2}$/.test(newTime)) { // Verifica se o formato é HH:MM:SS
    countdownElement.textContent = newTime;
  }
});

let timer;
function startTimer(duration) {
  let [hours, minutes, seconds] = duration.split(":").map(Number);
  const countdown = () => {
    if (seconds === 0 && minutes === 0 && hours === 0) {
      clearInterval(timer);
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

timeInput.addEventListener("change", () => {
  clearInterval(timer);
  startTimer(timeInput.value);
});
