const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const tileCount = canvas.width / tileSize;

let snake;
let direction;
let nextDirection;
let food;

let score = 0;
let bestScore = 0;

let gameInterval = null;
let countdownInterval = null;
let gameRunning = false;   // vrai seulement quand le serpent bouge

const speed = 140;

const scoreValue = document.getElementById('scoreValue');
const bestScoreValue = document.getElementById('bestScoreValue');
const startBtn = document.getElementById('startBtn');
const countdownEl = document.getElementById('countdown');

// ---------- INITIALISATION ----------

function initGameState() {
  snake = [
    { x: 10, y: 10 },
    { x: 9,  y: 10 },
    { x: 8,  y: 10 }
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  //score = 0;
  //updateScoreUI();
  food = randomFoodPosition();
}

// On prépare la première partie et on dessine l'écran statique
initGameState();
draw();

// ---------- BOUCLE PRINCIPALE ----------

function startGameLoop() {
  if (gameInterval) clearInterval(gameInterval);
  gameRunning = true;
  gameInterval = setInterval(gameLoop, speed);
}

function stopGameLoop() {
  gameRunning = false;
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
}

function gameLoop() {
  update();
  draw();
}

// ---------- LOGIQUE JEU ----------

function update() {
  direction = nextDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // Collision murs
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return gameOver();
  }

  // Collision avec soi-même
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return gameOver();
    }
  }

  snake.unshift(head);

  // Mange la nourriture
  if (head.x === food.x && head.y === food.y) {
    score++;
    if (score > bestScore) bestScore = score;
    updateScoreUI();
    food = randomFoodPosition();
  } else {
    snake.pop();
  }
}

// ---------- DESSIN ----------

function drawGrid() {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 26, 255, 0.08)";
  ctx.lineWidth = 1;

  for (let i = 1; i < tileCount; i++) {
    ctx.beginPath();
    ctx.moveTo(i * tileSize + 0.5, 0);
    ctx.lineTo(i * tileSize + 0.5, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * tileSize + 0.5);
    ctx.lineTo(canvas.width, i * tileSize + 0.5);
    ctx.stroke();
  }

  ctx.restore();
}

function draw() {
  ctx.fillStyle = "#050008";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawGrid();

  // Serpent
  for (let i = 0; i < snake.length; i++) {
    const part = snake[i];
    const isHead = i === 0;
    const px = part.x * tileSize;
    const py = part.y * tileSize;

    ctx.shadowBlur = isHead ? 18 : 14;
    ctx.shadowColor = "rgba(255, 26, 255, 0.95)";
    ctx.fillStyle = isHead ? "#ff8bff" : "#ff36ff";

    ctx.beginPath();
    ctx.roundRect(px + 1.5, py + 1.5, tileSize - 3, tileSize - 3, 4);
    ctx.fill();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
    ctx.stroke();
  }

  // Nourriture
  const foodX = food.x * tileSize;
  const foodY = food.y * tileSize;

  ctx.shadowBlur = 20;
  ctx.shadowColor = "rgba(255, 64, 64, 1)";
  ctx.fillStyle = "#ff4b4b";

  const padding = 4;
  ctx.beginPath();
  ctx.roundRect(
    foodX + padding,
    foodY + padding,
    tileSize - padding * 2,
    tileSize - padding * 2,
    6
  );
  ctx.fill();
}


function randomFoodPosition() {
  let newFood;
  let onSnake;

  do {
    onSnake = false;
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };

    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === newFood.x && snake[i].y === newFood.y) {
        onSnake = true;
        break;
      }
    }
  } while (onSnake);

  return newFood;
}


function updateScoreUI() {
  scoreValue.textContent = score;
  bestScoreValue.textContent = bestScore;
}


function gameOver() {
  stopGameLoop();

  ctx.fillStyle = "rgba(255, 64, 64, 0.28)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  setTimeout(() => {
    // alert("Game Over ! Score : " + score);

    //initGameState();
    draw();

    startBtn.textContent = "RESTART";
  }, 100);
}


function startCountdownAndGame() {
  if (gameRunning || countdownInterval) return;

  initGameState();
  draw();

  let count = 3;
  countdownEl.textContent = count;
  countdownEl.classList.remove('hidden');

  countdownInterval = setInterval(() => {
    count--;

    if (count > 0) {
      countdownEl.textContent = count;
    } else if (count === 0) {
      countdownEl.textContent = "GO";
    } else {
      clearInterval(countdownInterval);
      countdownInterval = null;
      countdownEl.classList.add('hidden');
      startGameLoop();
    }
  }, 1000);
}


document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key === 'ArrowUp' && direction.y !== 1) {
    nextDirection = { x: 0, y: -1 };
  } else if (key === 'ArrowDown' && direction.y !== -1) {
    nextDirection = { x: 0, y: 1 };
  } else if (key === 'ArrowLeft' && direction.x !== 1) {
    nextDirection = { x: -1, y: 0 };
  } else if (key === 'ArrowRight' && direction.x !== -1) {
    nextDirection = { x: 1, y: 0 };
  }
});

startBtn.addEventListener('click', () => {
  score = 0;
  updateScoreUI();
  initGameState();
  startCountdownAndGame();
});

document.getElementById("menuBtn").addEventListener("click", () => {
  window.location.href = "http://localhost:3000";
});
