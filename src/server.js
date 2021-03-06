import express from "express";
import Websocket from "ws";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3030;
const ws_port = 2020;

const wss = new Websocket.Server({
  port: ws_port
});

// Express
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Websockets
wss.on('connection', (ws) => {
  console.log("Conneted");

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  fs.watchFile('./assets/test.json', async(event) => {
    console.log(event);

    let data = await fs.readFileSync('./assets/test.json');
    data = JSON.parse(data);

    ws.send(JSON.stringify(data));
  });
});
