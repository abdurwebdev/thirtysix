import React, { useEffect, useRef, useState } from "react";
import canvasimages from "./canvasimages";
import gsap from "gsap";
import PropTypes from "prop-types";
import { useGSAP } from "@gsap/react";

const Canvas = ({ details }) => {
  const { startIndex = 0, numImages, duration, size = 288, top, left, zIndex } = details || {};
  const canvasRef = useRef();
  const indexRef = useRef({ value: startIndex });
  const [canvasSize] = useState({ width: size, height: size });

  useEffect(() => {
    if (startIndex < 0 || startIndex >= canvasimages.length) {
      console.error("Invalid startIndex: Out of bounds");
      return;
    }

    const canvasElement = canvasRef.current;
    const ctx = canvasElement.getContext("2d");

    const animation = gsap.to(indexRef.current, {
      value: Math.min(startIndex + (numImages || 149), canvasimages.length - 1),
      duration: duration || 3,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        const currentIndex = Math.round(indexRef.current.value);
        if (canvasimages[currentIndex]) {
          const img = new Image();
          img.onload = () => {
            ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
            ctx.drawImage(img, 0, 0, canvasSize.width, canvasSize.height);
          };
          img.onerror = () => {
            console.error(`Failed to load image at index ${currentIndex}`);
          };
          img.src = canvasimages[currentIndex];
        }
      },
    });

    return () => {
      animation.kill();
    };
  }, [startIndex, canvasSize, numImages, duration]);
  useGSAP(function(){
    gsap.from(canvasRef.current,{
      opacity:0,
      scale:.3,
      duration:.5,
      ease:"power2.inOut"
    })
  })
  return (
    <div className=" relative">
  <canvas
  data-scroll
  data-scroll-speed={Math.round(Math.random().toFixed(1))}
    ref={canvasRef}
    id="canvas"
    width={canvasSize.width}
    height={canvasSize.height}
    style={{
      position: "absolute",
      top: `${top}%`,
      left: `${left}%`,
      zIndex:`${zIndex}%`,
    }}
  ></canvas>
</div>

  );
};

// Prop validation
Canvas.propTypes = {
  details: PropTypes.shape({
    startIndex: PropTypes.number.isRequired,
    numImages: PropTypes.number,
    duration: PropTypes.number,
    size: PropTypes.number,
    top: PropTypes.string,
    left: PropTypes.string,
    zIndex: PropTypes.number,
  }).isRequired,
};

export default Canvas;
