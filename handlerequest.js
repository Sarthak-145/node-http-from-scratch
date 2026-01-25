import send from './response.js';

const handleRequest = (socket, request, body) => {
  //console.log('request obj: ', request);
  //console.log('body in text: ', body.toString('utf-8'));

  console.log('Entry in the handlrequest');

  if (request.headers.connection === 'close') {
    send(socket, '', 200, { Connection: 'close' });
    socket.end();
    return;
  }
  send(socket, 'Hello client I got ${body.length} bytes of body from you :)');
  console.log('request is responded!');
};

export default handleRequest;
