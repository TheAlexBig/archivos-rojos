import express from 'express';
import {connection} from './connector/index.js';
import { upgradeDatabase } from './changelog/index.js';


upgradeDatabase();

const app = express();


connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL server: ' + err.stack);
      return;
    }
  
    console.log('Connected to MySQL server as ID ' + connection.threadId);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})