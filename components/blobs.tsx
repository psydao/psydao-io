import type { BoxProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useCallback } from "react";

// https://codepen.io/rojo2/pen/NWRKMEe

interface BlobsProps extends BoxProps {
  palette?: string[];
}

const defaultPalette = ["#f0adad", "#f2bebe", "#f2bebe"];

export const Blobs = ({ palette = defaultPalette, ...rest }: BlobsProps) => {
  const ref = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas) {
        const cx = canvas.getContext("2d");
        if (cx) {
          cx.globalCompositeOperation = "source-over";
          cx.imageSmoothingEnabled = true;
          cx.imageSmoothingQuality = "low";

          const gradients = palette.map((color: string) => {
            const gradient = cx.createRadialGradient(0, 0, 1, 0, 0, 50);
            gradient.addColorStop(0, color + "10");
            gradient.addColorStop(1, color + "00");
            return gradient;
          });

          const blobs: Blob[] = [];

          class Blob {
            color: CanvasGradient;
            radius: number;
            x: number;
            y: number;
            dx: number;
            dy: number;
            startTime: number;
            currentTime: number;
            duration: number;
            constructor(time: number, height: number, width: number) {
              const colorIndex = Math.floor(Math.random() * palette.length);
              this.color = gradients[colorIndex]!;
              this.radius = 50;
              this.x = Math.random() * width;
              this.y = Math.random() * height;
              this.dx = Math.random() * 2 - 1;
              this.dy = Math.random() * 2 - 1;
              this.startTime = time;
              this.currentTime = time;
              this.duration = Math.ceil(Math.random() * 1000);
            }

            update(time: number) {
              this.currentTime = time;
              if (this.currentTime - this.startTime >= this.duration) {
                return false;
              }
              this.x += this.dx;
              this.y += this.dy;
              return true;
            }

            render(cx: CanvasRenderingContext2D) {
              cx.save();
              cx.globalAlpha =
                (this.currentTime - this.startTime) / this.duration;
              cx.translate(this.x, this.y);
              cx.beginPath();
              cx.arc(0, 0, this.radius, 0, Math.PI * 2);
              cx.fillStyle = this.color;
              cx.fill();
              cx.restore();
            }
          }

          const frame = (time: number) => {
            const multiplier = 0.25;
            const expectedWidth = Math.floor(canvas.clientWidth * multiplier);
            if (canvas.width !== expectedWidth) {
              canvas.width = expectedWidth;
            }
            const expectedHeight = Math.floor(canvas.clientHeight * multiplier);
            if (canvas.height !== expectedHeight) {
              canvas.height = expectedHeight;
            }

            if (blobs.length < 2) {
              blobs.push(new Blob(time, expectedHeight, expectedWidth));
            }

            for (let index = blobs.length - 1; index >= 0; index--) {
              const blob = blobs[index];
              if (!blob?.update(time)) {
                blobs.splice(index, 1);
              }
            }

            for (const blob of blobs) {
              blob.render(cx);
            }

            window.requestAnimationFrame(frame);
          };
          window.requestAnimationFrame(frame);
        }
      }
    },
    [palette]
  );

  return (
    <Box position="absolute" top="0" right="0" bottom="0" left="0" {...rest}>
      <Box
        // https://github.com/chakra-ui/chakra-ui/issues/2687
        //@ts-expect-error error
        ref={ref}
        as="canvas"
        height="100%"
        width="100%"
        filter="blur(20px) contrast(2)"
        {...rest}
      />
    </Box>
  );
};
