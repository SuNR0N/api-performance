import {
  Errback,
  NextFunction,
  Request,
  Response,
} from 'express';

import { HTTPError } from '../http-error';

export = () => {
  return (err: Errback, _req: Request, res: Response, next: NextFunction) => {
    if (err) {
      if (err instanceof HTTPError) {
        res
          .status(err.code)
          .json({ message: err.message });
      } else {
        res
          .status(500)
          .json({ message: 'Unknown Error' });
      }
    }
    next();
  };
}