document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  const timerDisplay = document.getElementById('timer');
  const focalPoint = document.querySelector('.focal-point');
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
    timer = setInterval(() => {
      updateTimer();
      triggerVisualCue(); // Check for visual cue
    }, 1000);

    focalPoint.classList.add('active');
  }

  function endFocusSession() {
    clearInterval(timer);
    startButton.textContent = 'Start Focus Session';
    timerDisplay.textContent = '00:00';

    focalPoint.classList.remove('active');
  }

  function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    timerDisplay.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
  }

  function triggerVisualCue() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    if (elapsedTime % 30 === 0) { // Every 30 seconds
      focalPoint.classList.add('cue');
      setTimeout(() => focalPoint.classList.remove('cue'), 500); // Remove cue after 0.5 seconds
    }
  }

  function padZero(number) {
    return number < 10 ? `0${number}` : number;
  }
});
