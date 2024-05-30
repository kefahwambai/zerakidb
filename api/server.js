const jsonServer = require('json-server');
const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const dbFilePath = path.join(__dirname, 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

const adapter = new Memory();
const db = low(adapter);
db.defaults(dbData).write();

const router = jsonServer.router(db);

server.use(cors());
server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('JSON Server is running on port', port);
});

module.exports = server;
