import { trips } from './trips.json';
import TripModel from './../models/trip';
import Database from '../database';

(async () => {
    try {
        console.log("Conectando a la base de datos");
        const database = Database.getInstance();
        await database.initDb();
        console.log('Inicio');
        console.log('Eliminando colección');
        await TripModel.deleteMany({});
        console.log('Guardando viajes');
        const result = await TripModel.insertMany(trips);
        console.log(`Se guardaron ${result.length} viajes`);
        console.log('Fin');
        process.exit();
    } catch (error) {
        console.log('Se produjo un error en la inserción', error);
    }
})();
