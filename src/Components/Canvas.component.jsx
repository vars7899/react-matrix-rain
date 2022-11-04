import { useEffect, useRef } from "react";
import { Effect } from "../Classes/Animation";
import {
  _default_backgroundColor,
  _default_fontSize,
  _default_textColor,
  _default_textString,
} from "../defaultSetting";

const Canvas = ({
  backgroundColor = _default_backgroundColor,
  textColor = _default_textColor,
  fontSize = _default_fontSize,
  textString = _default_textString,
  height,
  width,
}) => {
  const customStyle = {
    background: `rgb(${backgroundColor})`,
    position: "absolute",
    top: 0,
    left: 0,
  };
  const canvasEl = useRef(null);

  useEffect(() => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext("2d");
    const effectAni = new Effect(
      canvas.width,
      canvas.height,
      fontSize,
      textString
    );
    let _animationFrameID;
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
        ctx.fillStyle = `rgba(${backgroundColor}, 0.05)`;
        ctx.textAlign = "center";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = effectAni.fontSize + "px monospace";
        ctx.fillStyle = textColor;
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
  }, []);

  return (
    <>
      <canvas style={customStyle} ref={canvasEl} />
    </>
  );
};

export default Canvas;
