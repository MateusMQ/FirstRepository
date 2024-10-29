const countdownElement = document.getElementById("countdown");
const timeInput = document.getElementById("timeInput");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const setTimeBtn = document.getElementById("setTimeBtn");
const timePicker = document.getElementById("timePicker");

let timer;
let isRunning = false;
let savedTime; // Para manter o valor do tempo definido pelo usuário

// Carrega o valor do timer do localStorage se existir
window.onload = () => {
  const savedValue = localStorage.getItem("timerValue");
  if (savedValue) {
    countdownElement.textContent = savedValue;
    timeInput.value = savedValue; // Atualiza o input de tempo com o valor salvo
    savedTime = savedValue; // Salva o tempo definido pelo usuário
  }
};

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
    localStorage.setItem("timerValue", countdownElement.textContent);
  };
  timer = setInterval(countdown, 1000);
}

// Inicia ou pausa o timer ao clicar no botão
startPauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    startPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Muda para play
    isRunning = false;
  } else {
    startTimer(countdownElement.textContent);
    startPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Muda para pause
    isRunning = true;
  }
});

// Adiciona evento para o botão de reset
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  countdownElement.textContent = savedTime; // Reseta para o valor definido pelo usuário
  localStorage.setItem("timerValue", savedTime); // Atualiza o localStorage
});

// Adiciona evento para definir o tempo na caixa de seleção
setTimeBtn.addEventListener("click", () => {
  const newTime = timeInput.value;
  if (/^\d{2}:\d{2}:\d{2}$/.test(newTime)) { // Verifica se o formato é HH:MM:SS
    countdownElement.textContent = newTime; // Atualiza o contador com o novo tempo
    localStorage.setItem("timerValue", newTime); // Salva o novo tempo no localStorage
    savedTime = newTime; // Atualiza savedTime para o novo valor
  }
  timePicker.style.display = 'none'; // Esconde a caixa de seleção
});

// Permitir editar o tempo ao clicar no contador
countdownElement.addEventListener("click", () => {
  timePicker.style.display = 'block'; // Mostra a caixa de seleção
});
