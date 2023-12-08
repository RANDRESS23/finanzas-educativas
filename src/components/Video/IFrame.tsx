"use client";

import React, { useRef, useState } from "react";

export default function AlternativeVideoComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleSkip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += seconds;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  return (
    <div className="z-20 flex items-center justify-center rounded-lg w-80 h-56">
      <div>
        <div className="flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
          <div className="flex flex-col m-5">
            <div className="relative">
              <video
                className="w-screen"
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
              >
                <source
                  className="w-30 h-30"
                  src="https://youtu.be/7GpMU92fbSE"
                  type="video/mp4"
                />
              </video>
              <div className="absolute bottom-0 w-full bg-gradient-to-r from-black">
                <span className="text-white text-xs uppercase px-2">red</span>
              </div>
            </div>
            <div>
              {/* ... Resto del código ... */}
              <div className="flex justify-between text-xs font-medium text-gray-500 py-1">
                <div>{formatTime(currentTime)}</div>
                <div className="flex space-x-3 pt-5">
                  <button
                    className="focus:outline-none"
                    onClick={() => handleSkip(-10)}
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polygon points="19 20 9 12 19 4 19 20"></polygon>
                      <line x1="5" y1="19" x2="5" y2="5"></line>
                    </svg>
                  </button>
                  <button
                    className="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 ring-2 ring-green-500 focus:outline-none"
                    onClick={handlePlayPause}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                  <button
                    className="focus:outline-none"
                    onClick={() => handleSkip(10)}
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polygon points="5 4 15 12 5 20 5 4"></polygon>
                      <line x1="19" y1="5" x2="19" y2="19"></line>
                    </svg>
                  </button>
                </div>
                <div>3:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
