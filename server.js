import net from 'net';

const server = net.createServer((socket) => {
  let buffer = '';
  let headerParsed = false;

  socket.on('data', (chunk) => {
    buffer += chunk.toString();
    // here check if buffer has \r\n\r\n (ent of the header)

    if (!headerParsed) {
      //here header ends (at headerEndIndex)
      const headerEndIndex = buffer.indexOf('\r\n\r\n');
      if (headerEndIndex !== -1) {
        //this means we've got the full header now
        const header = buffer.slice(0, headerEndIndex);
        //log the complete header
        console.log('Header: ', header);

        //now remove header from the buffer
        buffer = buffer.slice(headerEndIndex + 4); //+4 cause of those four \r\n\r\n

        //now header is parsed and we only have body (if present)
        headerParsed = true;
      }
    }
  });

  socket.on('end', () => {
    console.log('Client hang up');
  });
  socket.on('error', (err) => {
    console.log('socket error: ', err.message);
  });
});

server.listen(3000);
