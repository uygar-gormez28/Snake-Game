// HTML etiketlerini seçme
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

// Oyun durumu değişkenleri
let gameOver = false;
let foodX, foodY;
let snakeX = 5;
let snakeY = 5;
let velocityX = 0;
let velocityY = 0;
let snakebody = [];
let setIntervalID;
let score = 0;

// En yüksek skoru localStorage'dan al, yoksa 0 olarak belirle
let highScore = localStorage.getItem("high-score") || 0;

// En yüksek skoru ekrana yaz
highScoreElement.innerText = `Max Skor: ${highScore}`;

// Yem konumunu rastgele belirleyen fonksiyon
const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// Oyunun bittiğini işleyen fonksiyon
const handleGameOver = () => {
  clearInterval(setIntervalID);
  alert("Hey Buddy Game is on");
  location.reload(); // Sayfayı yeniden yükleyerek oyunu sıfırlar
};

// Tuşa basıldığında yılanın yönünü değiştiren fonksiyon
const changeDirection = (e) => {
  // Yukarı ok tuşu ve yılan aşağı gitmiyorsa
  if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  }
  // Aşağı ok tuşu ve yılan yukarı gitmiyorsa
  else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  }
  // Sol ok tuşu ve yılan sağa gitmiyorsa
  else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  }
  // Sağ ok tuşu ve yılan sola gitmiyorsa
  else if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// Oyunu başlatan fonksiyon
const initGame = () => {
  if (gameOver) return handleGameOver();

  let html = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

  // Yılanın yemi yemişse
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakebody.push([foodX, foodY]);
    score++;

    // En yüksek skoru güncelle ve kaydet
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);

    // Skorları ekranda göster
    scoreElement.innerText = `Skor: ${score}`;
    highScoreElement.innerText = `Max Skor: ${highScore}`;
  }

  // Yılanın başını güncelle
  snakeX += velocityX;
  snakeY += velocityY;

  // Yılanın vücudunu hareket ettir
  for (let i = snakebody.length - 1; i > 0; i--) {
    snakebody[i] = snakebody[i - 1];
  }
  snakebody[0] = [snakeX, snakeY];

  // Yılanın tahta dışına çıkıp çıkmadığını kontrol et
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  // Yılanın vücut parçalarını HTML'e ekle
  for (let i = 0; i < snakebody.length; i++) {
    html += `<div class="head" style="grid-area:${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
    // Yılanın kendi vücuduna çarpıp çarpmadığını kontrol et (ilk parçayı atla)
    if (i > 0 && snakebody[0][0] === snakebody[i][0] && snakebody[0][1] === snakebody[i][1]) {
      gameOver = true;
    }
  }

  // Oyun tahtasını güncelle
  playBoard.innerHTML = html;
};

// Oyun başlamadan yem konumunu belirle
updateFoodPosition();

// Oyun döngüsünü başlat
setIntervalID = setInterval(initGame, 100);

// Klavye tuşlarına basıldığında yılanın yönünü değiştir
document.addEventListener("keyup", changeDirection);
