const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/analysis', (req, res) => {
      return app.render(req, res, '/', req.query);
    });

    server.get('/books', (req, res) => {
      return app.render(req, res, '/book', req.query);
    });
    server.get('/book/categories', (req, res) => {
      return app.render(req, res, '/book/category', req.query);
    });


    server.get('/book/category/update', (req, res) => {
      return app.render(req, res, '/BookCategory/book.category.update', req.query);
    });


    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  });