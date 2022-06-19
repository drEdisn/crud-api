import * as http from 'http';
import { requests, IRequests } from './server/requests';
import { getEnd } from './server/getEnd';
 
const port:string = process.env.SERVER_PORT;
const server = http.createServer();

server.on('request', (req, res) => {
  try {
    if (/^\/api\/users/.test(req.url)) {
      requests[req.method as keyof IRequests](req,res);
    } else {
      getEnd(res, 404, 'text/plain', 'Invalid request');
    }
  } catch {
    getEnd(res, 500, 'text/plain', 'Server error');
  }
})

server.listen(port, () => console.log(`Server started in http://localhost:${port}`));


export {port}