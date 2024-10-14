import { setupWorker } from 'msw/browser';
import { passthroughHandlers } from './passthrough';
import { loginMock } from '@/services/login.mock';
import { withAuthMock } from '@/services/withAuth.mock';
 
export const worker = setupWorker(
  ...passthroughHandlers,
  ...loginMock,
  ...withAuthMock,
);
