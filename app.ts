import Server from './helpers/server';
import { Request, Response } from 'express';
import Database from './database';

const server = new Server();

const { app } = server;

app.get('/', (req: Request, res: Response) => {
    res.send('Make it better :D');
});

server.start(async () => {
    try {
        const database = Database.getInstance();
        await database.initDb();
        console.log(
            'Conectado a la base de datos',
            database.conn.connection.name,
        );
        console.log('Running');
    } catch (error) {
        console.log('Error al conectarse =>', error);
    }
});
