import React, { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

interface Props {
  audioBase64: string;
}

const AudioPlayer: React.FC<Props> = ({ audioBase64 }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current!,
      waveColor: "#333",
      progressColor: "purple",
      cursorColor: "navy",
      barWidth: 3,
      barHeight: 1,
      responsive: true,
    });

    wavesurferRef.current = wavesurfer;

    wavesurfer.load("data:audio/wav;base64," + audioBase64);

    return () => {
      wavesurfer.destroy();
    };
  }, [audioBase64]);

  const handlePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.play();
    }
  };

  const handlePause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.pause();
    }
  };

  return (
    <div>
      <div ref={waveformRef} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
};

export default AudioPlayer;
