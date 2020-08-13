import TripModel from './../models/trip';
import { Request, Response } from 'express';
import Pagination from './../interfaces/pagination';
export default class TripController {
    async totalTrips(req: Request, res: Response) {
        try {
            const total = await TripModel.countDocuments({});
            res.json({ cantidad: total });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

    async totalTripsByCity(req: Request, res: Response) {
        try {
            const { city } = req.params;
            const total = await TripModel.countDocuments({ 'city.name': city });
            res.json({ cantidad: total });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

    async createTrip(req: Request, res: Response) {
        try {
            let { trip } = req.body;
            trip = await TripModel.create(trip);
            res.json( { trip });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

    async updateTrip(req: Request, res: Response) {
        try {
            const { id: _id } = req.params;
            const { trip } = req.body;
            const tripAct = await TripModel.findOneAndUpdate({ _id }, trip, { new: true });
            res.json({ trip: tripAct });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }

    async trips(req: Request, res: Response) {
        const pagination: Pagination = {
            page: 1,
            limit: 10
        }
        try {
            pagination.page = Number(req.query.page) || 1;
            const trips = await TripModel.paginate({}, pagination);
            res.json(trips);
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }
}
