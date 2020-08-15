import { Router } from 'express';
import TripController from './../controllers/TripController';

const router = Router();
const tripController = new TripController();

router.get('/total', tripController.totalTrips);
router.get('/:city', tripController.totalTripsByCity);
router.post('/', tripController.createTrip);
router.put('/:id', tripController.updateTrip);
router.get('/', tripController.trips);
router.post('/dynamic-rate', tripController.dynamicRate);

export default router;
