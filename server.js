import net from 'net';

const server = net.createServer((socket) => {
  let buffer = '';
  let headerParsed = false;
  const MAX_HEADER_SIZE = 8 * 1024;

  socket.on('data', (chunk) => {
    buffer += chunk.toString();
    // here check if buffer has \r\n\r\n (ent of the header)

    if (!headerParsed && buffer.length > MAX_HEADER_SIZE) {
      //format should be like this -> protocol, status code and then message
      //optionally can add headers, but I'll not for now.
      socket.end('HTTP/1.1 431 Request Header Fields Too Large\r\n\r\n');
      socket.destroy(); //optional end() also does the job, this is hard kill
      return;
    }

    if (!headerParsed) {
      //here header ends (at headerEndIndex)
      const headerEndIndex = buffer.indexOf('\r\n\r\n');
      if (headerEndIndex !== -1) {
        //this means we've got the full header now
        const headerData = buffer.slice(0, headerEndIndex);
        //log the complete header
        console.log('Header: \n', headerData);

        //now remove header from the buffer
        buffer = buffer.slice(headerEndIndex + 4); //+4 cause of those four \r\n\r\n

        //now header is parsed and we only have body (if present)
        headerParsed = true;

        //split line by line
        const lines = headerData.split('\r\n');
        //method, path and protocol are in first line always
        const [method, path, protocol] = lines[0].split(' ');
        //req object
        const request = {
          method,
          path,
          protocol,
          headers: {},
        };

        //rest of the lines
        for (let i = 1; i < lines.length; i++) {
          const KeyendIndex = lines[i].indexOf(':');
          if (KeyendIndex === -1) continue;
          const key = lines[i].slice(0, KeyendIndex).trim().toLowerCase();
          const value = lines[i].slice(KeyendIndex + 1).trim();

          request.headers[key] = value;
        }
        console.log('Request object: \n', request);
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
