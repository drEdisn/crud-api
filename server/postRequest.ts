import * as http from 'http';
import { users, IUser } from './users';
import { v4 } from 'uuid';
import { getEnd } from './getEnd';
 

const postRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
  let isCheck: IUser;
  let isValid: boolean = false;

  req.on('data', chunk => {
    try {
      isCheck = JSON.parse(chunk);
      if (isCheck.username && isCheck.age && isCheck.hobbys) {
        isValid = true;
        isCheck = Object.assign({id: v4()}, isCheck);
        users.push(isCheck);
      }
    } catch {
      getEnd(res, 500, 'text/plain', 'Invalid body');
    }
  })

  req.on('end', () => {
    if (isValid) {
      getEnd(res, 201, 'application/json', JSON.stringify(users[users.length - 1]));
    } else {
      getEnd(res, 400, 'text/plain', 'Body does not contain REQUIRED fields');
    }
  })
}

export {postRequest};