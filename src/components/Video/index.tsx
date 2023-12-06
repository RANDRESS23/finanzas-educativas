export default function VideoComponent({ video_url }: { video_url: string }) {
  return (
    <div className="z-20 flex items-center justify-center rounded-lg w-80 h-56">
      <iframe
        className="h-full w-full rounded-lg aspect-video"
        src={video_url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
