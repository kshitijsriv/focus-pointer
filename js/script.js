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
    if (elapsedTime % 10 === 0) { // Every 30 seconds
      focalPoint.classList.add('cue');
      setTimeout(() => focalPoint.classList.remove('cue'), 500); // Remove cue after 0.5 seconds
    }
  }

  function padZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  // Drag and Drop Functionality
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  focalPoint.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - focalPoint.getBoundingClientRect().left;
    offsetY = e.clientY - focalPoint.getBoundingClientRect().top;
    focalPoint.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      focalPoint.style.left = `${x}px`;
      focalPoint.style.top = `${y}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      focalPoint.style.cursor = 'grab';
    }
  });
});
