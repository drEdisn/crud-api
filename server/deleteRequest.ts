import * as http from 'http';
import { users } from './users';
import { findUser } from './findUser';
import { getEnd } from './getEnd';
import { validate } from 'uuid';

const deleteRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const isID: string = req.url.replace(/\/api\/users\//, '');
  const user = findUser(isID);

  if (isID && user.user) {
    users.splice(user.ind, 1);
    getEnd(res, 204, 'text/plain', 'User deleted');
  } else if (validate(isID)) {
    getEnd(res, 404, 'text/plain', 'User not found');
  } else {
    getEnd(res, 400, 'text/plain', 'Invalid request');
  }

}

export {deleteRequest};