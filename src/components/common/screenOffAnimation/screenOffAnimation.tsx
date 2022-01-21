import React, { RefObject, useEffect, useLayoutEffect, useRef } from "react";
import $ from "jquery";
import "./styles/_screenOffAnimationStyles.scss";

/**
 * ScreenOffAnimation
 */
const ScreenOffAnimation = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* if (topRef && topRef.current) {
      const { current } = topRef;
      console.log(`Current -->`, { current });
      topRef.current.animate([
        { height: "51%", opacity: 1 },
        {
          /!* timing options *!/
          duration: 300,
          iterations: Infinity,
        },
      ]);
    }

    if (centerRef && centerRef.current) {
      const { current } = centerRef;
    }

    if (bottomRef && bottomRef.current) {
      const { current } = bottomRef;
      console.log(`Current -->`, { current });
      bottomRef.current.animate([
        { width: "0", left: "50%" },
        {
          /!* timing options *!/
          duration: 300,
          iterations: Infinity,
        },
      ]);
    }*/

    $("div#topDiv").animate(
      {
        //51% for chrome
        height: "51%",
        opacity: 1,
      },
      300
    );
    $("div#bottomDiv").animate(
      {
        //51% for chrome
        height: "51%",
        opacity: 1,
      },
      300,
      function () {
        $("div#centerDiv")
          .css({ display: "block" })
          .animate(
            {
              width: "0%",
              left: "50%",
            },
            300,
            function () {
              console.log(`COMPLETE`, this);
            }
          );
      }
    );

    console.log(`useEffect lifeCycle: Component did mount`);
  }, []);

  return (
    <div className="screenOffAnimation">
      <div id="topDiv" ref={topRef} />
      <div id="centerDiv" ref={centerRef} />
      <div id="bottomDiv" ref={bottomRef} />
    </div>
  );
};

export default ScreenOffAnimation;
