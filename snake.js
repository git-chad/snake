
//#region Board variables

var blockSize = 25;

var rows = 25;
var columns = 25;

var board;
var context;

//#endregion 

//#region Snake

// snake head position initialization
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var speedX = 0;
var speedY = 0;

var snakeBody = [];

//#endregion

//#region Food

var foodX;
var  foodY;

//#endregion

var gameOver = false;

var score = 0;

window.onload = function (){

    board = document.getElementById("board");

    board.height = rows * blockSize;
    board.width = columns * blockSize;

    context = board.getContext("2d");

    foodPosRndmzr();

    document.addEventListener("keyup", changeDir);

    setInterval(update, 1000/10 * 1.2);
}

function update(){

    // stops updating once game is over
    if(gameOver) {
        return;
    }

    // board style
    context.fillStyle = "rgb(44, 50, 51)";
    context.fillRect(0, 0, board.width, board.height);

    // food style
    context.fillStyle = "rgb(237, 219, 183)";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    // eating
    if (snakeX == foodX && snakeY == foodY) {

        // extends snake body
        snakeBody.push([foodX, foodY])
        // new food location
        foodPosRndmzr();

        // scores a point and displays the current score
        score++;
        document.getElementById("score").innerHTML = score;

    }

    // position new tail at the end of body
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // snake style
    context.fillStyle = "rgb(178, 207, 91)";

    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    // restyle snake growth
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > columns.blockSize || snakeY < 0 || snakeY > rows.blockSize) {
        gameOver = true;
        alert("Game over || Out of bounds.");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game over || Ate your own body.");
        }
    }
}

function changeDir(e){
    
    if (e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;

    } else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;

    } else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;

    } else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }

}

function foodPosRndmzr(){

    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * columns) * blockSize;

}

