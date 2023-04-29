
// Board

let boxSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// Snake head 

let snakeX = boxSize * 5;
let snakeY = boxSize * 5;

// Snake body

let snake = [];

// Snake speed

let velocityX = 0;
let velocityY = 0;

// Food

let foodX;
let foodY;

// Game

let gameOver = false;

window.onload = function() {
    board = document.querySelector("[data-board]");
    board.height = rows * boxSize;
    board.width = cols * boxSize;
    context = board.getContext("2d"); // Used for drawing on the canvas
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver)
        return;
    context.fillStyle = "#a33232";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "#ffffff";
    snakeX += velocityX * boxSize;
    snakeY += velocityY * boxSize;
    context.fillRect(snakeX, snakeY, boxSize, boxSize);

    if (snakeX == foodX && snakeY == foodY) {
        snake.push([snakeX, snakeY]);
        placeFood();
    }

    for(let i = snake.length - 1; i > 0; i--) {
        snake[i] = snake[i - 1];
    }

    if (snake.length) {
        snake[0] = [snakeX, snakeY];
    }

    context.fillStyle = "sandybrown";
    context.fillRect(foodX, foodY, boxSize, boxSize);

    context.fillStyle = "white";
    
    for(let i = 0; i < snake.length; i++) {
        context.fillRect(snake[i][0], snake[i][1], boxSize, boxSize);
    }

    const worldElem = document.querySelector("[data-world]");

    // Check if snake is out of bounds
    if (snakeX < 0 || snakeX > cols * boxSize || snakeY < 0 || snakeY > rows * boxSize) {
        gameOver = true;
        const gameOverElem = document.createElement("div");
        gameOverElem.classList.add("game-over");
        gameOverElem.innerHTML = "Game Over!";
        const restartButton = document.createElement("button");
            restartButton.classList.add("restart-button");
            restartButton.innerHTML = "Restart";
            restartButton.addEventListener("click", function() {
                location.reload();
            });
        worldElem.appendChild(restartButton);
        worldElem.appendChild(gameOverElem);
    }

    // Check if snake has collided with itself
    for(let i = 1; i < snake.length; i++) {
        if (snakeX == snake[i][0] && snakeY == snake[i][1]) {
            gameOver = true;
            const gameOverElem = document.createElement("div");
            gameOverElem.classList.add("game-over");
            gameOverElem.innerHTML = "Game Over!";
            const restartButton = document.createElement("button");
            restartButton.classList.add("restart-button");
            restartButton.innerHTML = "Restart";
            restartButton.addEventListener("click", function() {
                location.reload();
            });
            gameOverElem.appendChild(restartButton);
            worldElem.appendChild(gameOverElem);
        }
    }
}

function changeDirection(event) {
    if (event.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (event.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (event.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (event.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Generate food at random locations
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * boxSize;
    foodY = Math.floor(Math.random() * rows) * boxSize;
}




