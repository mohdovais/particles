import { ceil, random } from "./contants";

export type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
};

type Boundry = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const randomVelocity = (speed: number): number => {
  const r = ceil(random() * speed);
  return (random() > 0.5 ? 1 : -1) * (r === 0 ? randomVelocity(speed) : r);
};

function createParticle({ x1, y1, x2, y2 }: Boundry, speed: number): Particle {
  const vx = randomVelocity(speed);
  const vy = randomVelocity(speed);
  const x = x1 + ceil(random() * x2);
  const y = y1 + ceil(random() * y2);
  const r = Math.sqrt(x * x + y * y) | 0;

  return { x, y, r, vx, vy };
}

function createParticles(
  { x1, y1, x2, y2 }: Boundry,
  count = 200,
  speed = 4
): Particle[] {
  const array = new Array(count);
  for (let i = 0; i < count; i++) {
    array[i] = createParticle({ x1, y1, x2, y2 }, speed);
  }
  return array;
}

function moveParticles(particles: Particle[], width: number, height: number) {
  const threshold = 100;
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

export { createParticles, moveParticles };
