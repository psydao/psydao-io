import { useState, useEffect } from "react";

const useRandomImage = (isRandom: boolean, images: string[]) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isRandom && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRandom, images.length]);

  console.log(currentImageIndex);

  return currentImageIndex;
};

export default useRandomImage;
