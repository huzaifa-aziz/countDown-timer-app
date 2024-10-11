// "use client"; // Enables client-side rendering for this component

// import { useState, useRef, useEffect, ChangeEvent } from "react"; // Import React hooks and types
// import { Input } from "@/components/ui/input"; // Import custom Input component
// import { Button } from "@/components/ui/button"; // Import custom Button component

// export default function Countdown() {
//   // State to manage the duration input
//   const [duration, setDuration] = useState<number | string>("");
//   // State to manage the countdown timer value
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   // State to track if the timer is active
//   const [isActive, setIsActive] = useState<boolean>(false);
//   // State to track if the timer is paused
//   const [isPaused, setIsPaused] = useState<boolean>(false);
//   // Reference to store the timer ID
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   // Function to handle setting the duration of the countdown
//   const handleSetDuration = (): void => {
//     if (typeof duration === "number" && duration > 0) {
//       setTimeLeft(duration); // Set the countdown timer
//       setIsActive(false); // Reset active state
//       setIsPaused(false); // Reset paused state
//       // Clear any existing timer
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     }
//   };

//   // Function to start the countdown timer
//   const handleStart = (): void => {
//     if (timeLeft > 0) {
//       setIsActive(true); // Set the timer as active
//       setIsPaused(false); // Unpause the timer if it was paused
//     }
//   };

//   // Function to pause the countdown timer
//   const handlePause = (): void => {
//     if (isActive) {
//       setIsPaused(true); // Set the timer as paused
//       setIsActive(false); // Set the timer as inactive
//       // Clear any existing timer
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     }
//   };

//   // Function to reset the countdown timer
//   const handleReset = (): void => {
//     setIsActive(false); // Set the timer as inactive
//     setIsPaused(false); // Set the timer as not paused
//     setTimeLeft(typeof duration === "number" ? duration : 0); // Reset the timer to the original duration
//     // Clear any existing timer
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }
//   };

//   // useEffect hook to manage the countdown interval
//   useEffect(() => {
//     // If the timer is active and not paused
//     if (isActive && !isPaused) {
//       // Set an interval to decrease the time left
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           // If time is up, clear the interval
//           if (prevTime <= 1) {
//             clearInterval(timerRef.current!);
//             return 0;
//           }
//           // Decrease the time left by one second
//           return prevTime - 1;
//         });
//       }, 1000); // Interval of 1 second
//     }
//     // Cleanup function to clear the interval
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [isActive, isPaused]); // Dependencies array to rerun the effect

//   // Function to format the time left into mm:ss format
//   const formatTime = (time: number): string => {
//     const minutes = Math.floor(time / 60); // Calculate minutes
//     const seconds = time % 60; // Calculate seconds
//     // Return the formatted string
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   // Function to handle changes in the duration input field
//   const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     setDuration(Number(e.target.value) || ""); // Update the duration state
//   };

//   // JSX return statement rendering the Countdown UI
//   return (
//     // Container div for centering the content
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Timer box container */}
//       <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
//         {/* Title of the countdown timer */}
//         <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
//           Countdown Timer
//         </h1>
//         {/* Input and set button container */}
//         <div className="flex items-center mb-6">
//           <Input
//             type="number"
//             id="duration"
//             placeholder="Enter duration in seconds"
//             value={duration}
//             onChange={handleDurationChange}
//             className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
//           />
//           <Button
//             onClick={handleSetDuration}
//             variant="outline"
//             className="text-gray-800 dark:text-gray-200"
//           >
//             Set
//           </Button>
//         </div>
//         {/* Display the formatted time left */}
//         <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
//           {formatTime(timeLeft)}
//         </div>
//         {/* Buttons to start, pause, and reset the timer */}
//         <div className="flex justify-center gap-4">
//           <Button
//             onClick={handleStart}
//             variant="outline"
//             className="text-gray-800 dark:text-gray-200"
//           >
//             {isPaused ? "Resume" : "Start"}
//           </Button>
//           <Button
//             onClick={handlePause}
//             variant="outline"
//             className="text-gray-800 dark:text-gray-200"
//           >
//             Pause
//           </Button>
//           <Button
//             onClick={handleReset}
//             variant="outline"
//             className="text-gray-800 dark:text-gray-200"
//           >
//             Reset
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }





///////////////////////

"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Timer() {
  const [inputTime, setInputTime] = useState<number | string>("");
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [onHold, setOnHold] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const configureTime = (): void => {
    if (typeof inputTime === "number" && inputTime > 0) {
      setRemainingTime(inputTime);
      setIsRunning(false);
      setOnHold(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const initiateCountdown = (): void => {
    if (remainingTime > 0) {
      setIsRunning(true);
      setOnHold(false);
    }
  };

  const haltCountdown = (): void => {
    if (isRunning) {
      setOnHold(true);
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resetTimer = (): void => {
    setIsRunning(false);
    setOnHold(false);
    setRemainingTime(typeof inputTime === "number" ? inputTime : 0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isRunning && !onHold) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onHold]);

  const timeFormatter = (time: number): string => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputTime(Number(e.target.value) || "");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-200 dark:bg-slate-800">
      <div className="bg-slate-50 dark:bg-slate-900 shadow-lg rounded-md p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Timer
        </h1>
        <div className="flex items-center mb-5">
          <Input
            type="number"
            id="timeInput"
            placeholder="Set time in seconds"
            value={inputTime}
            onChange={handleTimeChange}
            className="flex-grow mr-4 rounded-lg border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <Button onClick={configureTime} variant="outline" className="text-gray-700 dark:text-gray-300">
            Apply
          </Button>
        </div>
        <div className="text-5xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {timeFormatter(remainingTime)}
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={initiateCountdown} variant="outline" className="text-gray-700 dark:text-gray-300">
            {onHold ? "Resume" : "Start"}
          </Button>
          <Button onClick={haltCountdown} variant="outline" className="text-gray-700 dark:text-gray-300">
            Pause
          </Button>
          <Button onClick={resetTimer} variant="outline" className="text-gray-700 dark:text-gray-300">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
