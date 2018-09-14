import { Middleware } from 'redux';

export const logger: Middleware = (store) => (next) => (action) => {
  return next(action);
};
