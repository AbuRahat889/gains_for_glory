import ExerciseVideoCard from "./VideoCard";

export default function AllVideos() {
  return (
    <div className="min-h-screen bg-white py-5">
      <div className="">
        <div className="flex flex-col md:flex-row flex-nowrap md:flex-wrap gap-8">
          <ExerciseVideoCard
            title="Jumping Jacks"
            thumbnailSrc="/jumping-jacks.png"
            videoSrc="/sample-exercise-video.mp4" // Add your video file here
          />

          {/* Example of additional cards */}
          <ExerciseVideoCard
            title="Push Ups"
            thumbnailSrc="/placeholder.svg?height=320&width=256"
            videoSrc="/sample-exercise-video.mp4"
          />

          <ExerciseVideoCard
            title="Squats"
            thumbnailSrc="/placeholder.svg?height=320&width=256"
            videoSrc="/sample-exercise-video.mp4"
          />
        </div>
      </div>
    </div>
  );
}
