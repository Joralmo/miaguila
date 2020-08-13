import TripModel from './../models/trip';
import { Request, Response } from 'express';

export default class TripController {
    async totalTrips(req: Request, res: Response) {
        try {
            const total = await TripModel.countDocuments({});
            res.json({ cantidad: total });
        } catch (error) {
            res.send({ error: error.message }).status(500);
        }
    }
}