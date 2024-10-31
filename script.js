const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// the pong bars
const paddleWidth = 10;
const paddleHeight = 100;
const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "white",
    dy: 0
};

const computer = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "white"
};

// mmmm ball, this is the ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: 4,
    color: "white"
};

// Draw everything like everything
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
    context.fillStyle = computer.color;
    context.fillRect(computer.x, computer.y, computer.width, computer.height);
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, false);
    context.fill();
}

// Update stuff
function update() {
    // move the player bars
    player.y += player.dy;

    // unbeatable ai
    if (ball.y > computer.y + computer.height / 2) {
        computer.y += 4;
    } else {
        computer.y -= 4;
    }

    // ball movement
    ball.x += ball.dx;
    ball.y += ball.dy;

    // baller collision with top and bottom border idk
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    // ball collision with the bars
    if (ball.x - ball.size < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
        ball.dx *= -1;
    }
    
    if (ball.x + ball.size > computer.x && ball.y > computer.y && ball.y < computer.y + computer.height) {
        ball.dx *= -1;
    }

    // reset the ball if out of bound
    if (ball.x - ball.size < 0 || ball.x + ball.size > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1;
    }
}

// Controls for player bar
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        player.dy = -8;
    } else if (event.key === "ArrowDown") {
        player.dy = 8;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        player.dy = 0;
    }
});

// gamer loopdeeloop
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
