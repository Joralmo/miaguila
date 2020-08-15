import TripModel from './../models/trip';
import { Request, Response } from 'express';
import Pagination from './../interfaces/pagination';
export default class TripController {
    /**
     * Consulta en la base de datos la cantidad de viajes
     * @param req Request express
     * @param res Response express
     * @returns { number } La cantidad de viajes
     */
    async totalTrips(req: Request, res: Response) {
        try {
            const total = await TripModel.countDocuments({});
            res.json({ quantity: total });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

    /**
     * Recibe una ciudad en especifico y consulta la cantidad viajes registrados en esta ciudad
     * @param req Request express
     * @param res Response express
     * @returns { number | string } La cantidad de viajes o un mensaje informando que no se encontró la ciudad
     */
    async totalTripsByCity(req: Request, res: Response) {
        try {
            const { city } = req.params;
            const total = await TripModel.countDocuments({ 'city.name': city });
            if (total) res.json({ quantity: total });
            else res.status(404).json({ message: 'City not found' });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

    /**
     * Recibe un objeto trip y luego lo guarda en la base de datos
     * @param req Request express
     * @param res Response express
     * @returns { object } El objecto del viaje creado
     */
    async createTrip(req: Request, res: Response) {
        try {
            let { trip } = req.body;
            trip = await TripModel.create(trip);
            res.json({ trip });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

    /**
     * Recibe el id del viaje a editar y las propiedades a editar del viaje dentro de un objeto trip
     * @param req Request express
     * @param res Response express
     * @returns { object | string } El objeto completo actualizado o un mensaje informando que no se encontró el viaje
     */
    async updateTrip(req: Request, res: Response) {
        try {
            const { id: _id } = req.params;
            const { trip } = req.body;
            const tripAct = await TripModel.findOneAndUpdate({ _id }, trip, {
                new: true,
            });
            if (!tripAct) res.status(404).json({ message: 'Trip not found' });
            else res.json({ trip: tripAct });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

    /**
     * Recibe una página (no requerida) luego consulta los viajes de dicha página en la base de datos, en caso
     * de no envíar la página se toma la 1 por defecto
     * @param req Request express
     * @param res Response express
     * @return { object } Los viajes de la página solicitada
     */
    async trips(req: Request, res: Response) {
        const pagination: Pagination = {
            page: 1,
            limit: 10,
        };
        try {
            pagination.page = Number(req.query.page) || 1;
            const trips = await TripModel.paginate({}, pagination);
            res.json(trips);
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

    /**
     * Recibe una latitud y una longitud, luego consulta la cantidad de viajes y la cantidad de conductores¹ 
     * que hay en un radio de 5 kilómetros de la posición recibida para posteriormente dividir estas dos 
     * cantidades, en caso de que sea mayor la cantidad de conductores que de viajes no se realiza la división
     * Nota: 1 - simulando que tanto viajes como conductores son objetos diferentes y cada uno maneja su estado, por lo que se ignoran los que que tienen estado started
     * @param req Request express
     * @param res Response express
     * @returns { number } el resultado de la división o 1
     */
    async dynamicRate(req: Request, res: Response) {
        try {
            const { lat, lng } = req.body;
            if (!(lat && lng))
                return res.status(400).json({ message: 'lat or lng missing' });
            const locationAct = [lng, lat];
            const radiusEarthInMiles = 3958.8;
            const kilometers = 5;
            const trips = await TripModel.countDocuments({
                'start.pickup_location': {
                    $geoWithin: {
                        $centerSphere: [
                            locationAct,
                            (kilometers * 0.62137) / radiusEarthInMiles,
                        ],
                    },
                },
                status: {
                    $ne: 'started'
                }
            });
            const drivers = await TripModel.countDocuments({
                driver_location: {
                    $geoWithin: {
                        $centerSphere: [
                            locationAct,
                            (kilometers * 0.62137) / radiusEarthInMiles,
                        ],
                    },
                },
                status: {
                    $ne: 'started'
                }
            });
            const dynamic_rate = drivers < trips ? trips / drivers : 1;
            res.json({ dynamic_rate });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }
}
