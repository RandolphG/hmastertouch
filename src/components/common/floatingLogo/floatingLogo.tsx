import React, { useEffect, useRef } from "react";
import "./styles/_floatingLogoStyles.scss";

const FloatingLogo = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef && logoRef.current) {
      let interval = setInterval(() => {
        const nodeLetters: NodeListOf<ChildNode> = logoRef.current!.childNodes;
        nodeLetters.forEach((childNode: any, i) => {
          childNode.style.transform = `scale(${Math.random() * 0.9 + 1}`;
          childNode.style.top = `${Math.random() * 2}rem`;
          document.documentElement.style.setProperty(
            `--blur-${i}`,
            `${Math.random() * 90 + 30}rem`
          );
        });
      }, 1200);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div id="logo" ref={logoRef}>
      {["H", "a", "n", "g", "m", "a", "n"].map((letter, idx) => (
        <span key={idx} className="logoSpan">
          {letter}
        </span>
      ))}
    </div>
  );
};

export default FloatingLogo;
