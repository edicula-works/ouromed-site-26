export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Vocabulário único de easing (DESIGN.md): expo.out para entrar, expo.inOut para cortinas,
// power3.out para respostas pequenas de interface.
export const ease = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  soft: 'power3.out',
  spring: 'back.out(1.6)',
} as const;
