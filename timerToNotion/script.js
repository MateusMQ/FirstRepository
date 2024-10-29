let timeInSeconds = 300;

const countdownElement = document.getElementById('countdown');

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

countdownElement.innerHTML = formatTime(timeInSeconds);

function startTimer() {
  const timerInterval = setInterval(() => {
    timeInSeconds--;

    countdownElement.innerHTML = formatTime(timeInSeconds);

    if (timeInSeconds <= 0) {
      clearInterval(timerInterval);
      countdownElement.innerHTML = "00:00";
    }
  }, 1000);
}

startTimer();
