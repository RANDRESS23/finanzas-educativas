import { YouTubeEmbed } from "@next/third-parties/google";

export default function VideoComponent({ videoid }: { videoid: string }) {
  return (
    <div className="z-20 flex  items-center justify-center  rounded-lg w-96 h-64">
      <YouTubeEmbed videoid={videoid} />
    </div>
  );
}
