import React, { useEffect, useRef } from "react";

const customStyle = {
  //   background: "#000",
  position: "absolute",
  top: 0,
  left: 0,
};

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
    context.fillStyle = "#0aff0a";
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
  // Function --> private function member to initiate the effect
  #initialize() {
    for (let idx = 0; idx < this.columns; idx++) {
      this.symbols[idx] = new Symbol(idx, 0, this.fontSize, this.canvasHeight);
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

const Canvas = (props) => {
  const canvasEl = useRef(null);

  function drawToCanvas(ctx, frameCount) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#0aff0a";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  useEffect(() => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext("2d");
    const effectAni = new Effect(canvas.width, canvas.height);
    let _animationFrameID;
    let _frameCount = 0;
    let _lastTime = 0;
    const _fps = 30;
    const _nextFrame = 1000 / _fps;
    let _timer = 0;

    // Function --> to update the size of canvas
    function handleCanvasSpanSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      effectAni.resizeEffect(canvas.width, canvas.height);
    }
    handleCanvasSpanSize();

    function animate(timestamp) {
      const _deltaTime = timestamp - _lastTime;
      _lastTime = timestamp;
      if (_timer > _nextFrame) {
        _frameCount++;
        ctx.fillStyle = "rgba(0,0,0,0.04)";
        ctx.textAlign = "center";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //   drawToCanvas(ctx, _frameCount);
        ctx.font = effectAni.fontSize + "px monospace";
        effectAni.symbols.forEach((symbol) => symbol.draw(ctx));
        _timer = 0;
      } else {
        _timer += _deltaTime;
      }

      _animationFrameID = window.requestAnimationFrame(animate);
    }
    animate(0);
    window.addEventListener("resize", handleCanvasSpanSize);

    return () => {
      window.removeEventListener("resize", handleCanvasSpanSize);
      window.cancelAnimationFrame(_animationFrameID);
    };
  }, [drawToCanvas]);

  return (
    <>
      <canvas style={customStyle} ref={canvasEl} {...props} />
    </>
  );
};

export default Canvas;
