// Create web server
// Run command: node comments.js
// Access in browser: http://localhost:3000
// Create new comment: http://localhost:3000/new
// Show all comments: http://localhost:3000/comments
// Show a specific comment: http://localhost:3000/comments/1

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const comments = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.pathname;

  switch (path) {
    case '/new':
      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          const post = qs.parse(body);
          comments.push(post.comment);
          res.end('Comment added successfully');
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <form method="post">
            <textarea name="comment"></textarea>
            <button type="submit">Add comment</button>
          </form>
        `);
      }
      break;
    case '/comments':
      if (parsedUrl.query) {
        const index = parseInt(parsedUrl.query);
        const comment = comments[index];
        if (comment) {
          res.end(`Comment #${index}: ${comment}`);
        } else {
          res.end('Comment not found');
        }
      } else {
        res.end(`
          <ul>
            ${comments.map((comment, index) => `<li><a href="/comments?${index}">Comment #${index}</a></li>`).join('')}
          </ul>
        `);
      }
      break;
    default:
      res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
