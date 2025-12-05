"use client";

import { useEffect, useState } from "react";
import "./intro-animation.css";

export default function IntroAnimation() {
  // états : intro (normal), fade (fondu), hidden (fin)
  const [stage, setStage] = useState<"intro" | "fade" | "hidden">("intro");

  useEffect(() => {
    // moment où l’animation principale finit (scroll + cross + white-box + zoom)
    const zoomEnd = setTimeout(() => {
      setStage("fade");
    }, 5900); // ≈ 4.4s + zoom 1.5s

    // fin du fade-out → on supprime le composant
    const fadeEnd = setTimeout(() => {
      setStage("hidden");
    }, 5900 + 800); // 0.8s de fondu

    return () => {
      clearTimeout(zoomEnd);
      clearTimeout(fadeEnd);
    };
  }, []);

  if (stage === "hidden") return null;

  return (
    <div className={`intro-overlay ${stage === "fade" ? "fade-out" : ""}`}>
      <div id="intro-container">
        <div id="cross-container">
          <div id="cross">X</div>
          <div id="klub-box">
            <img id="klub" src="/KLUB1.png" alt="KLUB" />
          </div>
        </div>

        <div id="white-box"></div>

        <div id="nird-container">
          <div id="nird-n">
            <div className="nird-box">N</div>
            <div className="nird-box">N</div>
            <div className="nird-box">N</div>
            <div className="nird-box">N</div>
            <div className="nird-box">N</div>
            <div className="nird-box">N</div>
            <div className="nird-box">N</div>
            <div className="nird-box">N</div>
          </div>
          <div id="nird-i">
            <div className="nird-box">I</div>
            <div className="nird-box">I</div>
            <div className="nird-box">I</div>
            <div className="nird-box">I</div>
            <div className="nird-box">I</div>
            <div className="nird-box">I</div>
            <div className="nird-box">I</div>
            <div className="nird-box">I</div>
          </div>
          <div id="nird-r">
            <div className="nird-box">R</div>
            <div className="nird-box">R</div>
            <div className="nird-box">R</div>
            <div className="nird-box">R</div>
            <div className="nird-box">R</div>
            <div className="nird-box">R</div>
            <div className="nird-box">R</div>
            <div className="nird-box">R</div>
          </div>
          <div id="nird-d">
            <div className="nird-box">D</div>
            <div className="nird-box">D</div>
            <div className="nird-box">D</div>
            <div className="nird-box">D</div>
            <div className="nird-box">D</div>
            <div className="nird-box">D</div>
            <div className="nird-box">D</div>
            <div className="nird-box">D</div>
          </div>
        </div>
      </div>
    </div>
  );
}
