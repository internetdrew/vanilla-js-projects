'use strict';

const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Move ball
// Add wall boundaries
// Increase score when bricks break
// Lose - redraw bricks and reset score

const game = {
  score: 0,
  brickRowCount: 5,
  brickColumnCount: 9,
};

// Ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// Paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0,
};

const brickInfo = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const fillBrickRows = function (rows, colIndex) {
  return rows.map((row, rowIndex) => {
    const x =
      colIndex * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
    const y =
      rowIndex * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;

    return { x, y, ...brickInfo };
  });
};

const getBricksData = function () {
  const brickRows = new Array(game.brickRowCount).fill({});
  const brickColumns = new Array(game.brickColumnCount).fill([]);

  const brickRowsInColumns = brickColumns.map((column, index) =>
    fillBrickRows(brickRows, index)
  );

  return brickRowsInColumns;
};

const drawBrick = function (brick) {
  ctx.beginPath();
  ctx.rect(brick.x, brick.y, brick.width, brick.height);
  ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
  ctx.fill();
  ctx.closePath();
};

const drawBricks = function () {
  const bricks = getBricksData();
  bricks.forEach(column => {
    column.forEach(brick => drawBrick(brick));
  });
};

const drawBall = function () {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = function () {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

const drawScore = function () {
  ctx.font = '2rem Arial';
  ctx.fillText(`Score: ${game.score}`, canvas.width - 100, 30);
};

const movePaddle = function () {
  paddle.x += paddle.dx;

  // Wall detection
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
};

const moveBall = function () {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall detection(x)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // When it hits, it gives it the opposite value
  }

  // Wall detection y-axis
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
};

const draw = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
};

const update = function () {
  movePaddle();
  moveBall();
  draw();
  requestAnimationFrame(update);
};

const keyDown = function (e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') {
    paddle.dx = paddle.speed;
  }

  if (e.key === 'ArrowLeft' || e.key === 'Left') {
    paddle.dx = -paddle.speed;
  }
};

const keyUp = function (e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
};

window.addEventListener('load', update);
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
