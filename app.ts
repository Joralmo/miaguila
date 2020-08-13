import Server from './helpers/server';
import { Request, Response } from 'express';

const server = new Server();

const { app } = server;

app.get('/', (req: Request, res: Response) => {
    res.send('Make it better :D');
});

server.start(async () => {
    console.log('Running');
});
