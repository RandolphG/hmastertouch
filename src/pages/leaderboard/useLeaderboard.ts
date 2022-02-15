import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSystemState } from "../../state-mgmt";

export const useLeaderboard = () => {
  const { highScores } = useSelector(selectSystemState);

  const motionSettings = {
    initial: { opacity: 0, translateX: 25 },
    animate: { opacity: 1, translateX: 0 },
  };

  useEffect(() => {
    const slider: any = document.querySelector(".items");
    let isDown = false;
    let startX: any;
    let scrollLeft: any;

    slider.addEventListener("mousedown", (e: any) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  });
  return { motionSettings, highScores };
};
