import * as http from 'http';
import { IUser } from './users';
import { validate } from 'uuid';
import { getEnd } from './getEnd';
import { findUser } from './findUser';

const putRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
  let isCheck: IUser;
  let isID: string = req.url.replace(/\/api\/users\//, '');
  let user = findUser(isID).user;

  req.on('data', chunk => {
    try {
      isCheck = JSON.parse(chunk);
    } catch {
      getEnd(res, 500, 'text/plain', 'Invalid body');
    }
  })

  req.on('end', () => {
    if (isID && user) {
      user.username = isCheck.username ? isCheck.username : user.username;
      user.age = isCheck.age ? isCheck.age : user.age;
      user.hobbys = isCheck.hobbys ? isCheck.hobbys : user.hobbys;

      getEnd(res, 200, 'application/json', JSON.stringify(user));
    } else if (validate(isID)) {
      getEnd(res, 404, 'text/plain', 'User not found');
    } else {
      getEnd(res, 400, 'text/plain', 'Invalid request');
    }
  })
}

export {putRequest, findUser};