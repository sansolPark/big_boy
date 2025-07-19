
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const background = new Image();
background.src = 'assets/background.png';

const catFrames = [new Image(), new Image()];
catFrames[0].src = 'assets/cat1.png';
catFrames[1].src = 'assets/cat2.png';

let frameIndex = 0;
let frameTick = 0;
let catX = 100;
let catY = canvas.height - 150;
let catVY = 0;
let gravity = 0.8;
let isJumping = false;

let bgX = 0;
let obstacles = [];

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !isJumping) {
    catVY = -15;
    isJumping = true;
  }
});

function spawnObstacle() {
  const height = 80 + Math.random() * 50;
  obstacles.push({ x: canvas.width + 20, y: canvas.height - height, width: 40, height: height });
}

function drawBackground() {
  bgX -= 2;
  if (bgX <= -canvas.width) bgX = 0;
  ctx.drawImage(background, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(background, bgX + canvas.width, 0, canvas.width, canvas.height);
}

function drawCat() {
  ctx.drawImage(catFrames[frameIndex], catX, catY, 100, 100);
}

function drawObstacles() {
  ctx.fillStyle = 'red';
  obstacles.forEach((ob, i) => {
    ob.x -= 5;
    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);

    // Collision check
    if (
      catX + 80 > ob.x &&
      catX < ob.x + ob.width &&
      catY + 80 > ob.y
    ) {
      alert("게임 오버!");
      obstacles = [];
      catY = canvas.height - 150;
      catVY = 0;
      isJumping = false;
    }

    if (ob.x + ob.width < 0) {
      obstacles.splice(i, 1);
    }
  });
}

function update() {
  frameTick++;
  if (frameTick % 10 === 0) frameIndex = (frameIndex + 1) % catFrames.length;

  catY += catVY;
  catVY += gravity;
  if (catY >= canvas.height - 150) {
    catY = canvas.height - 150;
    catVY = 0;
    isJumping = false;
  }

  if (frameTick % 120 === 0) {
    spawnObstacle();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawCat();
  drawObstacles();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
