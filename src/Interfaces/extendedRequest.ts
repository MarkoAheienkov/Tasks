import { Request } from 'express';

export default interface ExtendedRequest extends Request {
  content?: Record<string, any>;
}
