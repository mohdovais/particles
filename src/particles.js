const math = Math;
const random = math.random;
const ceil = math.ceil;

function createParticle({ x1, y1, x2, y2 }, speed, halfSpeed) {
  const vx = ceil(random() * speed) - halfSpeed;
  const vy = ceil(random() * speed) - halfSpeed;
  const x = x1 + ceil(random() * x2);
  const y = y1 + ceil(random() * y2);
  const r = Math.sqrt(x * x + y * y);

  return {
    x,
    y,
    r,
    vx: vx === 0 ? 1 : vx,
    vy: vy === 0 ? 1 : vy,
    a: Math.atan(y / x)
  };
}

/**
 *
 * @param {Object} boundry
 * @param {Number} count
 * @param {Number} speed
 * @returns {Object[]}
 */
export function createParticles({ x1, y1, x2, y2 }, count = 200, speed = 4) {
  const array = new Array(count);
  const halfSpeed = Math.floor(speed / 2);
  for (let i = 0; i < count; i++) {
    array[i] = createParticle({ x1, y1, x2, y2 }, speed, halfSpeed);
  }
  return array;
}

export function moveParticles(particles, width, height) {
  const threshold = 0;
  const x1 = 0 - threshold;
  const y1 = 0 - threshold;
  const x2 = width + threshold;
  const y2 = height + threshold;
  const count = particles.length;

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
}
