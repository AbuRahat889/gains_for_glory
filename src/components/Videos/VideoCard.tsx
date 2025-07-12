"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import Image from "next/image";

interface ExerciseVideoCardProps {
  title: string;
  videoSrc?: string;
  thumbnailSrc: string;
  className?: string;
}

export default function ExerciseVideoCard({
  title,
  videoSrc,
  thumbnailSrc,
  className = "",
}: ExerciseVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoSrc) {
      setShowVideo(true);
      setIsPlaying(true);
      // Small delay to ensure video element is rendered
      setTimeout(() => {
        videoRef.current?.play();
      }, 100);
    }
  };

  const handlePauseClick = () => {
    setIsPlaying(false);
    videoRef.current?.pause();
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowVideo(false);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Video Card */}
      <div className="relative w-full md:w-64 h-80 bg-gray-100 rounded-2xl overflow-hidden border border-[#747474]">
        {!showVideo ? (
          // Thumbnail View
          <div className="relative w-full h-full">
            <Image
              src={thumbnailSrc || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayClick}
                className="w-16 h-16 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                aria-label={`Play ${title} video`}
              >
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </button>
            </div>
          </div>
        ) : (
          // Video View
          <div className="relative w-full h-full">
            {videoSrc ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                onEnded={handleVideoEnd}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              // Fallback if no video source
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No video available</p>
              </div>
            )}

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={
                  isPlaying ? handlePauseClick : () => videoRef.current?.play()
                }
                className="w-16 h-16 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200"
                aria-label={
                  isPlaying ? `Pause ${title} video` : `Play ${title} video`
                }
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" fill="white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Exercise Title */}
      <h3 className="mt-4 text-lg md:text-2xl font-semibold text-orange-500">{title}</h3>
    </div>
  );
}
