const bgCanvas = document.getElementById('background');
const bgCtx = bgCanvas.getContext('2d');

function resizeCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  drawBackground();
}

function drawBackground() {
  const gradient = bgCtx.createLinearGradient(0, 0, bgCanvas.width, bgCanvas.height);
  gradient.addColorStop(0, '#ff9a9e'); // pink
  gradient.addColorStop(1, '#a18cd1'); // purple

  bgCtx.fillStyle = gradient;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
