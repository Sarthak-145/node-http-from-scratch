const handleRequest = (socket, reqest, body) => {
  console.log('request obj: ', reqest);
  console.log('body in text: ', body.toString('utf-8'));

  const resBody = `Hello client I got ${body.length} bytes of body from you :)`;
  const res =
    `HTTP/1.1 200 OK\r\n` +
    `Content-Length: ${Buffer.byteLength(resBody)}\r\n` +
    `Content-Type: text/plain\r\n` +
    `Connection: keep-alive\r\n` +
    `\r\n` +
    resBody;
  socket.write(res);
};

export default handleRequest;
