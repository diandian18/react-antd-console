import { setupWorker } from 'msw/browser';
import { passthroughHandlers } from './passthrough';
import { loginMock } from '@/services/login.mock';
import { withAuthMock } from '@/services/withAuth.mock';
import { tableMock } from '@/pages/tablePage/table.mock';
 
export const worker = setupWorker(
  ...passthroughHandlers,
  ...loginMock,
  ...withAuthMock,
  ...tableMock,
);
