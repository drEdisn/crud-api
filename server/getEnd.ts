import * as http from 'http';

const getEndRequest = (res: http.ServerResponse, key: number, type: string, message : string) => {
  res.writeHead(key, {'Content-Type': type});
  res.end(message);
}

export {getEndRequest}; 