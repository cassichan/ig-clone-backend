import app from '.';
import {createServer} from 'http'
//Seperate app from way you listen so you can test server seperately for testing

const server = createServer(app);

const PORT = 5001;
server.listen(PORT, () => {
  console.log('we started on port', PORT);
});