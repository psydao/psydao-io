import { useState, useEffect } from "react";

export const useAudio = (url: string | undefined) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  const playAudio = async (): Promise<void> => {
    if (playing) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    playAudio().catch((error) => {
      console.error("Error in playAudio:", error);
    });
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return { playing, toggle };
};
