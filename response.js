const send = (socket, body = '', status = 200, headers = {}) => {
  const defaultHeaders = {
    'Content-Type': 'text/plain',
    'Content-Length': Buffer.byteLength(body),
    Connection: 'keep-alive',
  };

  const allHeaders = { ...defaultHeaders, ...headers };

  let headerStr = `HTTP/1.1 ${status} OK\r\n`;

  // we can say anti-parsing. we want to send string and not an object.
  for (const key in allHeaders) {
    headerStr += `${key}:${allHeaders[key]}\r\n`;
  }

  socket.write(headerStr + '\r\n' + body);
};

export default send;
