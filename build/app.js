class Car {
    constructor(imagePath, xPosition, yPosition) {
        this.setDistance = (distanceRaced) => {
            this.distance = distanceRaced;
        };
        this.getDistance = () => {
        };
        this.getXPosition = () => {
        };
        this.getYPosition = () => {
        };
        this.getName = () => {
            return this.name;
        };
        this.draw = (ctx) => {
            ctx.drawImage(this.image, this.xPosition, this.yPosition);
        };
        this.loadNewImage = (source) => {
            const img = new Image();
            img.src = source;
            return img;
        };
        this.image = this.loadNewImage(imagePath);
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_R = 82;
class Game {
    constructor(canvas) {
        this.rollDice = () => {
            return this.randomNumber(1, 6);
        };
        this.keyHandler = () => {
            this.gameState = 'Game Phase';
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas("Game phase", 20, this.canvas.width / 2, 30, "center", 'white');
            this.player1.distance = this.rollDice();
            this.player2.distance = this.rollDice();
            if (this.player1.distance > this.player2.distance) {
                console.log('player1 won');
                this.winner = 'player1';
            }
            else {
                console.log('player2 won');
                this.winner = 'player2';
            }
            setTimeout(this.endPhase, 5000);
        };
        this.endPhase = () => {
            this.gameState = 'endPhase';
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas("End phase", 20, this.canvas.width / 2, 30, "center", 'white');
            this.writeTextToCanvas(`The winner is ${this.winner}`, 20, this.canvas.width / 2, 400, "center", "white");
        };
        this.loop = () => {
            this.draw();
            if (this.gameState == 'begin' && this.keyboardListener.isKeyDown(82)) {
                this.keyHandler();
            }
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keyboardListener = new KeyboardListener();
        this.gameState = "begin";
        this.player1 = new Car("assets/img/green-racing-car.png", 10, 10);
        this.player2 = new Car("assets/img/red-racing-car.png", 10, 200);
        this.loop();
    }
    draw() {
        this.player1.draw(this.ctx);
        this.player2.draw(this.ctx);
        if (this.gameState == 'begin') {
            this.writeTextToCanvas("Begin phase", 20, this.canvas.width / 2, 30, "center", 'white');
            this.writeTextToCanvas("Press R to roll the dice", 20, this.canvas.width / 2, 450, "center", 'white');
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map