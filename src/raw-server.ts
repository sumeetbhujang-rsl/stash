import { createServer } from 'node:http';

const bookmarks = [
  { id: 1, url: 'https://example1.com', title: 'Example1' },
  { id: 2, url: 'https://example2.com', title: 'Example2' },
  { id: 3, url: 'https://example3.com', title: 'Example3' },
  // two more
];

const server = createServer((req, res) => {
  console.log('Method:', req.method);
  console.log('URL:', req.url);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/') {
    res.setHeader('Content-Type', 'text/plain')
    res.end(JSON.stringify('Hello World homepage!'))
  } else if (req.method === 'GET' && req.url === '/api/v1/health') {
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }))
} else if (req.method === 'GET' && req.url === '/api/v1/bookmarks') {
    res.end(JSON.stringify({ status: 'ok', bookmarks: bookmarks }))
} else {
  res.statusCode = 404;
  res.end(JSON.stringify({ status: 'Not Found', path: req.url }))
}


});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});