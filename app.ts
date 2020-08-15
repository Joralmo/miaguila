import Server from './helpers/server';
import { Request, Response } from 'express';
import Database from './database';
import swaggerUi from 'swagger-ui-express';
import * as options from './swagger.json';
import router from './route';

const server = new Server();

const { app } = server;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(options));

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Make it better :D' });
});

app.use('/trips', router);

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

export default app;
