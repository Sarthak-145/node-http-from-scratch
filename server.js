import net from 'net';

const server = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    console.log('RAW:', chunk);
  });
  socket.on('end', () => {
    console.log('Client hang up');
  });
  socket.on('error', () => {
    console.log('socket error: ', err.message);
  });
});

server.listen(3000);
