import net from 'net';

console.log('Yes I am alive');

const server = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    console.log('RAW:', chunk.toString());
  });
});

server.listen(3000);
