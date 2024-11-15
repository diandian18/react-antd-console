import type { Variants } from 'framer-motion';

export const Animations: Record<string, Variants> = {
  ['bounceInRight']: {
    initial: { x: '3%' },
    in: { x: 0 },
  },
  ['bounceInLeft']: {
    initial: { x: '-3%' },
    in: { x: 0 },
  },
  ['bounceInUp']: {
    initial: { y: '3%' },
    in: { y: 0 },
  },
  ['bounceInDown']: {
    initial: { y: '-3%' },
    in: { y: 0 },
  },
  ['fadeIn']: {
    initial: {
      opacity: 0,
      scale: 0.96,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
  },
};
