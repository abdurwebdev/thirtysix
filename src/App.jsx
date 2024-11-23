import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";

const App = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollContainerRef.current,
      smooth: true,
    });

    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          // Set position of growing span to mouse click position
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          // Animate background color change and text color change
          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          // Animate growing span (circle expanding)
          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          // Transition back when the canvas is hidden
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    // Attach click handler
    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => {
      headingElement.removeEventListener("click", handleClick);
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollContainerRef} data-scroll-container>
      <span
        className="growing w-5 h-5 bg-[#FD2C2A] rounded-full absolute left-[-20px] top-[-20px]"
        ref={growingSpan}
      ></span>

      {showCanvas && (
        <>
          <div className="w-full  min-h-screen grid grid-cols-3 gap-4 p-4">
            {data[0]?.map((canvasdets, childIndex) => (
              <Canvas key={childIndex} details={canvasdets} />
            ))}
          </div>
          <div className="w-full  min-h-screen grid grid-cols-3 gap-4 p-4">
            {data[2]?.map((canvasdets, childIndex) => (
              <Canvas key={childIndex} details={canvasdets} />
            ))}
          </div>
        </>
      )}
      <div className="w-full h-screen absolute top-0 left-0">
        <nav className="flex justify-between items-center p-4 text-white">
          <div>
            <h1>thirtysixstudios</h1>
          </div>
          <div className="flex gap-x-5">
            <a href="#">
              <h1>Home</h1>
            </a>
            <a href="#">
              <h1>Shop</h1>
            </a>
            <a href="#">
              <h1>Services</h1>
            </a>
            <a href="#">
              <h1>Contact</h1>
            </a>
          </div>
        </nav>
        <div className="text-white font-[gilroy]">
          <h1 className="w-96 ml-96 text-3xl">
            At Thirtysixstudio, we build immersive digital experiences for
            brands with a purpose.
          </h1>
          <p className="w-96 ml-96 font-extralight mt-8">
            We’re a boutique production studio focused on design, motion, and
            creative technology, constantly reimagining what digital craft can do
            for present-time ads and campaigns.
          </p>
          <p className="ml-96 font-extralight mt-5">Scroll</p>
          <h1
            ref={headingRef}
            className="text-[12rem] ml-2 cursor-pointer"
            style={{ transition: "transform 0.3s ease" }}
          >
            Thirtysixstudio
          </h1>
          <h1 className="mt-10 ml-2 text-5xl">About the brand</h1>
          <p className="w-[700px] mt-5 ml-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos,
            laboriosam? Exercitationem aperiam libero fuga neque, quae atque
            odit quasi perspiciatis amet placeat, error autem dolor! Fugiat
            dignissimos quaerat nesciunt repellendus!
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
