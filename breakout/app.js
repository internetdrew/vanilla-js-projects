'use strict';

const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

// Create canvas context
// Create and draw ball
// Create and draw paddle
// Create bricks
// Draw score
// Add update() - Animate - requestAnimationFrame(cb)
// Move paddle
// Keyboard event handlers to move paddle
// Move ball
// Add wall boundaries
// Increase score when bricks break
// Lose - redraw bricks and reset score

const game = {
  score: 0,
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

const draw = function () {
  drawBall();
  drawPaddle();
  drawScore();
};

window.addEventListener('load', draw);
