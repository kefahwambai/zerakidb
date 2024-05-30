const jsonServer = require('json-server');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Memory = require('lowdb/adapters/Memory');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const adapter = new Memory();
const db = low(adapter);

db.defaults({ invoices: [], collections: [], schools: [] }).write();

const router = jsonServer.router(db);

server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}));
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

module.exports = server;
