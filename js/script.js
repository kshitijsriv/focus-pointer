document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  const timerDisplay = document.getElementById('timer');
  let timer;
  let startTime;

  startButton.addEventListener('click', () => {
    if (startButton.textContent === 'Start Focus Session') {
      startFocusSession();
    } else {
      endFocusSession();
    }
  });

  function startFocusSession() {
    startTime = Date.now();
    startButton.textContent = 'End Focus Session';
    timer = setInterval(updateTimer, 1000);

    // Show the focal point
    const focalPoint = document.querySelector('.focal-point');
    focalPoint.classList.add('active');
  }

  function endFocusSession() {
    clearInterval(timer);
    startButton.textContent = 'Start Focus Session';
    timerDisplay.textContent = '00:00';

    // Hide the focal point
    const focalPoint = document.querySelector('.focal-point');
    focalPoint.classList.remove('active');
  }

  function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    timerDisplay.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
  }

  function padZero(number) {
    return number < 10 ? `0${number}` : number;
  }
});
