import * as http from 'http';
import { users } from './users';
import { validate } from 'uuid';
import { getEndRequest } from './getEnd';

const getRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
  let isPath: string = '/api/users';
  let isID: string = req.url.split('/')[req.url.split('/').length - 1];
  let isIdIndex: number;

  users.forEach((i, ind) => {
    if (`${isPath}/${i.id}` === req.url) {
      isPath += `/${i.id}`;
      isIdIndex = ind;
    }
  });

  if (req.url === '/api/users') {
    getEndRequest(res, 200, 'application/json', JSON.stringify(users));
  } else if (req.url === isPath && validate(isID)) {
    getEndRequest(res, 200, 'application/json', JSON.stringify(users[isIdIndex]));
  } else if (validate(isID) && req.url !== isPath) {
    getEndRequest(res, 404, 'text/plain', 'User not found');
  } else {
    getEndRequest(res, 400, 'text/plain', 'Invalid request');
  }
}

export {getRequest};