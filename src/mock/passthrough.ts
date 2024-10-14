import { http, passthrough } from 'msw';

export const passthroughHandlers = [
  http.get('*.ts', () => passthrough()),
  http.get('*.tsx', () => passthrough()),
  http.get('*.json', () => passthrough()),
  http.get('*.js', () => passthrough()),
  http.get('*.css', () => passthrough()),
  http.get('*.less', () => passthrough()),
  http.get('*.svg', () => passthrough()),
  http.get('*.png', () => passthrough()),
];
