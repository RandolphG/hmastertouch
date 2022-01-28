import React, { useEffect } from "react";
import "./styles/_leaderboardStyles.scss";
import { useSelector } from "react-redux";
import { selectSystemState } from "../../state-mgmt";
import { motion } from "framer-motion";

/**
 * Leaderboard
 */
const Leaderboard = () => {
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
  console.log(`SCORE --->`, highScores);

  return (
    <div className="grid-container">
      <main className="grid-item main">
        <div className="items">
          {highScores.map((score, idx) => (
            <motion.div
              key={idx}
              className="item item1"
              {...motionSettings}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "green solid 3px",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    width: "100%",
                    textAlign: "center",
                    border: "green solid 3px",
                  }}
                >
                  {score.userName}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "2rem",
                      width: "100%",
                      textAlign: "center",
                      border: "green solid 3px",
                    }}
                  >
                    Score
                  </div>
                  <div
                    style={{
                      fontSize: "11rem",
                      width: "100%",
                      textAlign: "center",
                      border: "green solid 3px",
                    }}
                  >
                    {score.score}
                  </div>
                  <div
                    style={{
                      fontSize: "2rem",
                      width: "100%",
                      textAlign: "center",
                      border: "green solid 3px",
                    }}
                  >
                    character count: {score.length}
                  </div>
                  <div
                    style={{
                      fontSize: "2rem",
                      width: "100%",
                      textAlign: "center",
                      border: "green solid 3px",
                    }}
                  >
                    characters : {score.uniqueCharacters}
                  </div>
                </div>
                <div>time :{(score.duration / 1000).toFixed(1)}s</div>
                <div>Errors :{score.errors}</div>
                <div>{score.quoteId}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
