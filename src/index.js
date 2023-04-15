import express from 'express';
import {connection} from './connector/index.js';
import { upgradeDatabase } from './changelog/index.js';


upgradeDatabase();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})