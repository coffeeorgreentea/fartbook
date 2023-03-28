import { useState, useRef } from "react";

interface AudioPlayerProps {
  base64Audio: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ base64Audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={`data:audio/mp3;base64,${base64Audio}`}
        onEnded={onEnded}
      />
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default AudioPlayer;
