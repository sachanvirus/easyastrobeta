"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  endTime: Date;
}

const calculateTimeLeft = (endTime: Date) => {
  const difference = +new Date(endTime) - +new Date();
  let timeLeft: { [key: string]: number } = {};

  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor(difference / 1000 / 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<any>(null);

  useEffect(() => {
    // Set initial time on mount (client-side only)
    setTimeLeft(calculateTimeLeft(endTime));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (!timeLeft) {
    return (
        <div className="flex justify-center gap-2 sm:gap-4 p-2 sm:p-4 bg-muted rounded-lg animate-pulse">
            <div className="flex flex-col items-center">
                <span className="text-lg sm:text-2xl font-bold text-foreground">--</span>
                <span className="text-xs uppercase text-muted-foreground">minutes</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-lg sm:text-2xl font-bold text-foreground">--</span>
                <span className="text-xs uppercase text-muted-foreground">seconds</span>
            </div>
        </div>
    );
  }

  const timerComponents: any[] = [];
  const timeEntries = Object.entries(timeLeft);

  timeEntries.forEach(([interval, value]) => {
    timerComponents.push(
      <div key={interval} className="flex flex-col items-center">
        <span className="text-lg sm:text-2xl font-bold text-foreground">
          {String(value).padStart(2, '0')}
        </span>
        <span className="text-xs uppercase text-muted-foreground">{interval}</span>
      </div>
    );
  });
  
  if (timerComponents.length === 0) {
    return <div className="p-4 bg-muted rounded-lg text-center"><span>Time's up!</span></div>
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-4 py-0 px-2 sm:px-4 bg-muted rounded-lg">
      {timerComponents}
    </div>
  );
}
