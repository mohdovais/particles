import { createParticles, moveParticles } from "./particles";
import { draw, resizer } from "./canvas";
import { win, reqAnimationFrame, EVENT_NAME_RESIZE } from "./contants";

type Config = {
  count: number;
  distance: number;
  speed: number;
  animate;
  boolean;
  strokeStyle: string;
  fillStyle: string;
  size: number;
};

export function init(canvas: HTMLCanvasElement, config: Config) {
  var {
    count,
    distance,
    speed,
    animate = true,
    strokeStyle,
    fillStyle,
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

  function redraw() {
    particles.sort(function (a, b) {
      return a.r - b.r;
    });

    //console.time("draw")
    draw(canvas, particles, { distance, strokeStyle, fillStyle, size });
    //console.timeEnd("draw")

    if (animate !== false) {
      moveParticles(particles, width, height);
      reqAnimationFrame(redraw);
    }
  }
  reqAnimationFrame(redraw);

  return () => {
    animate = false;
    win.removeEventListener(EVENT_NAME_RESIZE, onResize);
  };
}
