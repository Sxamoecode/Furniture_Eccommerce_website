const {createServer} = require('http');
require('dotenv').config();
const app = require('./app');
const {mongoConnect} = require('./services/mongo');

const PORT = process.env.PORT || 7000

const server = createServer(app)

async function startServer() {
    await mongoConnect();


    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();
