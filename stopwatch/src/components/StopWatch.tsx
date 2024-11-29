"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type LapTime = number;

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [lap, setLap] = useState<LapTime[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLap([]);
  };

  const handleLap = () => {
    setLap((prevLap) => [...prevLap, time]);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
      <Card className="w-full max-w-xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold text-primary mt-4">
            Stopwatch
          </CardTitle>
          <CardDescription className="text-lg">
            Track your time with precision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-5xl md:text-8xl font-semibold text-center mt-2 mb-4">
            {formatTime(time)}
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={isRunning ? handleStop : handleStart}
              className="px-6 md:px-8 py-6 text-lg rounded-xl"
            >
              {isRunning ? "Stop" : "Start"}
            </Button>
            <Button
              onClick={handleLap}
              className="px-6 md:px-8 py-6 text-lg rounded-xl"
              disabled={!isRunning}
            >
              Lap
            </Button>
            <Button
              onClick={handleReset}
              className="px-6 md:px-8 py-6 text-lg rounded-xl"
            >
              Reset
            </Button>
          </div>

          {lap.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow className="w-full">
                  <TableHead className="text-left text-lg font-semibold text-black">Lap</TableHead>
                  <TableHead className="text-right text-lg font-semibold text-black">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lap.map((lapTime, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      #{index + 1}
                    </TableCell>
                    <TableCell className="text-right">{formatTime(lapTime)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StopWatch;