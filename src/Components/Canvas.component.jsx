import React, { useEffect, useRef } from "react";

const customStyle = {
  background: "#000",
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
  }
  draw() {}
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
  }
  #initialize() {
    for (let idx = 0; idx < this.columns; idx++) {
      this.symbols[idx] = new Symbol();
    }
  }
}

const Canvas = (props) => {
  const canvasEl = useRef(null);

  function drawToCanvas(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  useEffect(() => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext("2d");

    function handleCanvasSpanSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    handleCanvasSpanSize();
    window.addEventListener("resize", handleCanvasSpanSize);
    drawToCanvas(ctx);
    return () => window.removeEventListener("resize", handleCanvasSpanSize);
  }, [drawToCanvas]);

  return (
    <>
      <canvas style={customStyle} ref={canvasEl} {...props} />
    </>
  );
};

export default Canvas;
