var canvas, ctx;
window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);
  // merender X kali per detik
  var x = 8;
  setInterval(draw, 1000 / x);
};
// game world
var gridSize = (tileSize = 21);
var nextX = (nextY = 0);
// snake
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);
// apple
var appleX = (appleY = 15);
// draw
function draw() {
  // pindahkan ular di pos berikutnya
  snakeX += nextX;
  snakeY += nextY;

  // snake keluar game world?
  if (snakeX < 0) {
    snakeX = gridSize - 1;
  }
  if (snakeX > gridSize - 1) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = gridSize - 1;
  }
  if (snakeY > gridSize - 1) {
    snakeY = 0;
  }

  //snake menggigit apple?
  if (snakeX == appleX && snakeY == appleY) {
    tailSize++;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }

  //paint background
  ctx.fillStyle = "#1C1D24";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grid lines
  ctx.strokeStyle = "#71717173"; // Menetapkan warna garis grid
  for (let i = 0; i <= gridSize; i++) {
    // Menggambar garis vertikal
    ctx.beginPath(); // Memulai path baru
    ctx.moveTo(i * tileSize, 0); // Memindahkan titik awal path ke posisi (i * tileSize, 0)
    ctx.lineTo(i * tileSize, canvas.height); // Membuat garis dari titik awal ke bawah sepanjang tinggi kanvas
    ctx.stroke(); // Menggambar garis pada kanvas

    // Menggambar garis horizontal
    ctx.beginPath(); // Memulai path baru
    ctx.moveTo(0, i * tileSize); // Memindahkan titik awal path ke posisi (0, i * tileSize)
    ctx.lineTo(canvas.width, i * tileSize); // Membuat garis dari titik awal ke kanan sepanjang lebar kanvas
    ctx.stroke(); // Menggambar garis pada kanvas
  }

  // Membuat gradien
  grd = ctx.createLinearGradient(0.0, 150.0, 300.0, 150.0);

  // warna
  grd.addColorStop(0.0, "rgba(247, 149, 51, 1.000)");
  grd.addColorStop(0.151, "rgba(243, 112, 85, 1.000)");
  grd.addColorStop(0.311, "rgba(239, 78, 123, 1.000)");
  grd.addColorStop(0.462, "rgba(161, 102, 171, 1.000)");
  grd.addColorStop(0.621, "rgba(80, 115, 184, 1.000)");
  grd.addColorStop(0.748, "rgba(16, 152, 173, 1.000)");
  grd.addColorStop(0.875, "rgba(7, 179, 155, 1.000)");
  grd.addColorStop(1.0, "rgba(111, 186, 130, 1.000)");

  // mewarnai ular
  ctx.fillStyle = grd;
  for (var i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(snakeTrail[i].x * tileSize, snakeTrail[i].y * tileSize, tileSize, tileSize);

    //ular menggigit ekornya sendiri?
    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      tailSize = defaultTailSize;
    }
  }

  // mewarnai apple
  ctx.fillStyle = grd;
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

  //set snake trail
  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}

// input
function keyDownEvent(e) {
  switch (e.keyCode) {
    case 65: // left arrow key
      if (nextX !== 1 || snakeTrail.length === 0) {
        // Check if the snake is not moving right or if it's the first move
        nextX = -1;
        nextY = 0;
      }
      break;
    case 87: // up arrow key
      if (nextY !== 1 || snakeTrail.length === 0) {
        // Check if the snake is not moving down or if it's the first move
        nextX = 0;
        nextY = -1;
      }
      break;
    case 68: // right arrow key
      if (nextX !== -1 || snakeTrail.length === 0) {
        // Check if the snake is not moving left or if it's the first move
        nextX = 1;
        nextY = 0;
      }
      break;
    case 83: // down arrow key
      if (nextY !== -1 || snakeTrail.length === 0) {
        // Check if the snake is not moving up or if it's the first move
        nextX = 0;
        nextY = 1;
      }
      break;
  }
}
