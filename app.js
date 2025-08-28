//html etiketlerini şeçme
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScore = document.querySelector(".high-score");

//oyunun bitip bitmediğini belirleyen değişken
let gameOver = false;

//yem konumunu tutacak değişken
let foodX, foodY;
//yılan konumunu tutacak değişken
let snakeX = 5;
let snakeY = 5;

//yılanın hızını belirleyen değişken
let veloityX = 0;
let veloityy = 0;

//yılanın vucüdunu temsil eden dizi
let snakebody = [];

//oyun döngüsünü konrtol edecek değiiken
let setIntervalID;

//oyuncu skorunu tutacak değişken

let score = 0;

//en yüksek değeri localstorageden al
let hightScore = localStorage.getItem("high-score") || 0;

//en yüksek skoru ekrana yaz

highScoreElement.innerText = `Max Skor: ${highScore}`;

//yem konumunu rastgele belirleyen fonksiyon

const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

//oyunun bittiğini işleyen funtion

const handleGameOver = () => {
  clearInterval(setIntervalID); //todo buranın ne olduğuna tekrar bak
  alert("Hey Buddy Game is on");
  location.reload(); //? bu ne işe yarıyor?????
  //todo sayfa yeniliyormuş
};

//tuşa basıldığında yılanın yönünü değiştiren funct

const changeDirection = (e) => {
  if (e.key == "ArrowUp" && veloityy) {
  }
};
