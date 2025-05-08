import { Router } from 'react-router-toolset';
import { routesConfig } from './config';

const basename = import.meta.env.VITE_BASENAME;

const router = new Router(routesConfig, {
  basename,
});

export default router;

export * from 'react-router-toolset';
