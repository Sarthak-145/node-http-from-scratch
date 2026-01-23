const handleRequest = (socket, request, body) => {
  //console.log('request obj: ', request);
  //console.log('body in text: ', body.toString('utf-8'));

  console.log('Entry in the handlrequest');

  if (request.headers.connection === 'close') {
    socket.end(
      `HTTP/1.1 200 OK\r\n` +
        `Content-Length: 0\r\n` +
        `Content-Type: text/plain\r\n` +
        `Connection: close\r\n` +
        `\r\n`
    );
  } else {
    const resBody = `Hello client I got ${body.length} bytes of body from you :)`;
    const res =
      `HTTP/1.1 200 OK\r\n` +
      `Content-Length: ${Buffer.byteLength(resBody)}\r\n` +
      `Content-Type: text/plain\r\n` +
      `Connection: keep-alive\r\n` +
      `\r\n` +
      resBody;
    socket.write(res);
    console.log('request is responded!');
  }
};

export default handleRequest;
