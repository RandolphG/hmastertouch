import { useState, useEffect, useCallback } from "react";

type time = {
  SS: number;
  MM: number;
  HH: number;
};

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [time, setTime] = useState<time>({ SS: 0, MM: 0, HH: 0 });

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 0.1);
      }, 100);
    }
    setTime(convertTime(elapsedTime));

    return () => clearInterval(interval);
  }, [isRunning, elapsedTime]);

  /* convert elapsed time */
  const convertTime = useCallback((elapsedTime: number) => {
    const SS = Number((elapsedTime % 60).toFixed(2));
    const MM = Number(leadZero(((elapsedTime / 60) % 60).toFixed(), 2));
    const HH = Number(leadZero(((elapsedTime / 60 / 60) % 24).toFixed(), 2));

    return {
      SS,
      MM,
      HH,
    };
  }, []);

  return {
    time,
    isRunning,
    setIsRunning,
    elapsedTime: elapsedTime.toFixed(1),
    setElapsedTime,
  };
};

/* add leading zero */
const leadZero = (str: string, length: number): string => {
  str += "";
  while (str.length < length) {
    str = "0" + str;
  }

  return str;
};
