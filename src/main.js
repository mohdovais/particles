import { createParticles } from "./particles.js";
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
      const threshold = 0;
      const { width, height } = canvas;
      const x1 = 0 - threshold;
      const y1 = 0 - threshold;
      const x2 = width + threshold;
      const y2 = height + threshold;

      for (let i = 0; i < count; i++) {
        let particle = particles[i];

        const pX = particle.x + particle.vx;
        const pY = particle.y + particle.vy;
        particle.x = pX;
        particle.y = pY;
        particle.r = Math.sqrt(pX * pX + pY * pY);

        if (pX < x1 || pX > x2) {
          particle.vx = -particle.vx;
        }

        if (pY < y1 || pY > y2) {
          particle.vy = -particle.vy;
        }
      }

      reqAnimationFrame(redraw);
    }
  }
  reqAnimationFrame(redraw);

  return () => {
    animate = false;
    win.removeEventListener(EVENT_NAME_RESIZE, onResize);
  };
}
