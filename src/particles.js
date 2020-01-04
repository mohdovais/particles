import { filter } from "./array.js";
const math = Math;
const random = math.random;
const ceil = math.ceil;

function createParticle({ x1, y1, x2, y2 }, speed, halfSpeed) {
  const vx = ceil(random() * speed) - halfSpeed;
  const vy = ceil(random() * speed) - halfSpeed;
  return {
    x: x1 + ceil(random() * x2),
    y: y1 + ceil(random() * y2),
    vx: vx === 0 ? 1 : vx,
    vy: vy === 0 ? 1 : vy
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
  const maxSpeed = speed + 2;
  const halfSpeed = Math.floor(maxSpeed / 2);
  for (let i = 0; i < count; i++) {
    array[i] = createParticle({ x1, y1, x2, y2 }, maxSpeed, halfSpeed);
  }
  return array;
}

/**
 * 
 * @param {Object} particle 
 * @param {Object[]} particles 
 * @param {Number} distanceSquare 
 */
export function nearestParticles(particle, particles, distanceSquare = 2500) {
  return filter(particles, neighbour => {
    if (neighbour === particle) {
      return false;
    }
    const dx = particle.x - neighbour.x;
    const dy = particle.y - neighbour.y;
    return dx * dx + dy * dy < distanceSquare;
  });
}

/**
 * 
 * @param {Object} particle 
 * @param {Object} boundry 
 */
export function moveWithinCanvas(particle, { x1, y1, x2, y2 }) {
  particle.x += particle.vx;
  particle.y += particle.vy;

  if (particle.x < x1 || particle.x > x2) {
    particle.vx = -particle.vx;
  }

  if (particle.y < y1 || particle.y > y2) {
    particle.vy = -particle.vy;
  }
}
