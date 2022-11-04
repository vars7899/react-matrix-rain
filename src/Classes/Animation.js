class Symbol {
  constructor(x, y, fontSize, canvasHeight, characters) {
    this.characters = characters;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    // Active Character choose from list of characters randomly
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    // context.fillStyle = "#0aff0a";
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight, fontSize, characters) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = fontSize;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.characters = characters;
    this.#initialize();
  }
  // Function --> private function member to initiate the effect
  #initialize() {
    for (let idx = 0; idx < this.columns; idx++) {
      this.symbols[idx] = new Symbol(
        idx,
        0,
        this.fontSize,
        this.canvasHeight,
        this.characters
      );
    }
  }
  // Function --> on resize reset the canvas width, canvas height resulting in new number of columns and resetting the symbols array with nothing in it
  resizeEffect(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

export { Effect, Symbol };
