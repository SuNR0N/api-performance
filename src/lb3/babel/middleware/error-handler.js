import { HTTPError } from '../http-error';

export default () => {
  return (err, _req, res, next) => {
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