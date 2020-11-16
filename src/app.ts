/// <reference path="Car.ts" />
/// <reference path="KeyboardListener.ts" />

class Game {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  // KeyboardListener so the player can move
  private keyboardListener: KeyboardListener;

  // the state of the game: begin, gamePhase and end
  private gameState: string;
  private winner: string;

  // Declare a new car
  private player1: Car;
  private player2: Car;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.keyboardListener = new KeyboardListener();

    this.gameState = "begin";

    // Create a new car
    this.player1 = new Car("assets/img/green-racing-car.png", 10, 10);
    this.player2 = new Car("assets/img/red-racing-car.png", 10, 200);

    this.loop();
  }

  /**
   * Function to give a number between 1 and 6
   * @returns {number} number - number between 1 and 6
   */
  private rollDice = (): number => {
    return this.randomNumber(1, 6);
  }

  /**
   * handles the keydown event by rolling a random number and determing a winner
   */
  private keyHandler = () => {
      this.gameState = 'Game Phase'
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.writeTextToCanvas("Game phase", 20, this.canvas.width / 2, 30, "center", 'white');
      this.player1.distance = this.rollDice();
      this.player2.distance = this.rollDice();
      if (this.player1.distance > this.player2.distance) {
        console.log('player1 won');
        this.winner = 'player1';
      } else {
        console.log('player2 won');
        this.winner = 'player2';
      }
      setTimeout(this.endPhase, 5000)
  }

  /**
   * handles the end of the game by 
   */
  private endPhase = () => {
    this.gameState = 'endPhase';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.writeTextToCanvas("End phase", 20, this.canvas.width / 2, 30, "center", 'white');
    this.writeTextToCanvas(`The winner is ${this.winner}`, 20, this.canvas.width / 2, 400, "center", "white")
  }

  /**
   * Method for the Game Loop
   * Based on the game state some actions have to be executed
   */
  private loop = () => {
    this.draw();
    if (this.gameState == 'begin' && this.keyboardListener.isKeyDown(82)) {
      this.keyHandler()
    }
    requestAnimationFrame(this.loop);
  };

  /**
   * Function to draw all the cars on the canvas
   */
  private draw() {
    this.player1.draw(this.ctx);
    this.player2.draw(this.ctx);
    if (this.gameState == 'begin') {
      this.writeTextToCanvas("Begin phase", 20, this.canvas.width / 2, 30, "center", 'white');
      this.writeTextToCanvas("Press R to roll the dice", 20, this.canvas.width / 2, 450, "center", 'white')
    }
  }

  /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "red"
  ) {
    this.ctx.font = `${fontSize}px Minecraft`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
  /**
   * Renders a random number between min and max
   * @param {number} min - minimal time
   * @param {number} max - maximal time
   */
  public randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

/**
 * Start the game whenever the entire DOM is loaded
 */
let init = () =>
  new Game(document.getElementById("canvas") as HTMLCanvasElement);

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
