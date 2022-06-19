import * as http from 'http';
import { deleteRequest } from './deleteRequest';
import { getRequest } from './getRequest';
import { postRequest } from './postRequest';
import { putRequest } from './putRequest';

interface IRequests {
  'GET': Function,
  'POST': Function,
  'PUT': Function,
  'DELETE': Function
}

const requests = {
  GET (req: http.IncomingMessage, res: http.ServerResponse) {
    getRequest(req,res);
  },
  POST (req: http.IncomingMessage, res: http.ServerResponse) {
    postRequest(req, res);
  },
  PUT (req: http.IncomingMessage, res: http.ServerResponse) {
    putRequest(req, res);
  },
  DELETE (req: http.IncomingMessage, res: http.ServerResponse) {
    deleteRequest(req, res);
  }
}

export {requests, IRequests};