import { createParticles, moveParticles } from "./particles.js";
import { draw, resizer } from "./canvas.js";
import { win, reqAnimationFrame, EVENT_NAME_RESIZE } from "./contants.js";

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Object} config
 */
export function init(
  canvas,
  { count, distance, speed, animate, strokeStyle, fillStyle, size }
) {
  const onResize = resizer(canvas);
  const { width, height } = onResize();
  const particles = createParticles(
    {
      x1: 0,
      y1: 0,
      x2: width,
      y2: height
    },
    count,
    speed
  );

  win.addEventListener(EVENT_NAME_RESIZE, onResize);

  function redraw() {
    particles.sort(function(a, b) {
      return a.r - b.r;
    });

    draw(canvas, particles, { distance, strokeStyle, fillStyle, size });

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
