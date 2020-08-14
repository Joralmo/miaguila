import Server from './helpers/server';
import { Request, Response } from 'express';
import Database from './database';
import TripController from './controllers/TripController';
import swaggerUi from 'swagger-ui-express';
import * as options from './swagger.json';

const server = new Server();

const { app } = server;
const tripController = new TripController();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(options));

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Make it better :D' });
});

app.get('/trips/total', tripController.totalTrips);
app.get('/trips/:city', tripController.totalTripsByCity);
app.post('/trips', tripController.createTrip);
app.put('/trips/:id', tripController.updateTrip);
app.get('/trips', tripController.trips);
app.post('/trips/dynamic-rate', tripController.dynamicRate);

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
