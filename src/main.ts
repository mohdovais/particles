import { createParticles, moveParticles } from "./particles";
import { draw, resizer } from "./canvas";
import { win, reqAnimationFrame, EVENT_NAME_RESIZE } from "./contants";

type Config = {
  count: number;
  distance: number;
  speed: number;
  animate: boolean;
  strokeStyle: string;
  fillStyle: string;
  size: number;
};

export function init(canvas: HTMLCanvasElement, config: Config) {
  var {
    count = 500,
    distance = 100,
    speed = 4,
    animate = true,
    strokeStyle = "rgba(0,0,0,0.1)",
    fillStyle = "black",
    size = 2,
  } = config;
  const onResize = resizer(canvas);
  const { width, height } = onResize();
  const particles = createParticles(
    {
      x1: 0,
      y1: 0,
      x2: width,
      y2: height,
    },
    count,
    speed
  );

  win.addEventListener(EVENT_NAME_RESIZE, onResize);

  let oldTimestamp = 0;

  function redraw(timestamp = 0) {
    if (timestamp - oldTimestamp > 16) {
      draw(canvas, particles, { distance, strokeStyle, fillStyle, size });
      moveParticles(particles, width, height);
      oldTimestamp = timestamp;
    }

    if (animate !== false) {
      reqAnimationFrame(redraw);
    }
  }
  reqAnimationFrame(redraw);

  return () => {
    animate = false;
    win.removeEventListener(EVENT_NAME_RESIZE, onResize);
  };
}
