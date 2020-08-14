import TripModel from './../models/trip';
import { Request, Response } from 'express';
import Pagination from './../interfaces/pagination';
export default class TripController {
    async totalTrips(req: Request, res: Response) {
        try {
            const total = await TripModel.countDocuments({});
            res.json({ quantity: total });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

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

    async createTrip(req: Request, res: Response) {
        try {
            let { trip } = req.body;
            trip = await TripModel.create(trip);
            res.json({ trip });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

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
            });
            const dynamic_rate = drivers < trips ? trips / drivers : 1;
            res.json({ dynamic_rate });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }
}
