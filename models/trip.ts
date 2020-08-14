import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const carSchema = new Schema({
    plate: {
        type: String,
    },
});

const citySchema = new Schema({
    name: {
        type: String,
    },
});

const createdAtSchema = new Schema({
    date: {
        type: String,
    },
});

const driverSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
});

const locationSchema = new Schema({
    type: {
        type: String,
    },
    coordinates: {
        type: [Number],
    },
});

const endSchema = new Schema({
    date: {
        type: createdAtSchema,
        default: null,
    },
    pickup_address: {
        type: String,
    },
    pickup_location: {
        type: locationSchema,
    },
});

const tripSchema = new Schema({
    start: {
        type: endSchema,
    },
    end: {
        type: endSchema,
    },
    country: {
        type: citySchema,
    },
    city: {
        type: citySchema,
    },
    passenger: {
        type: driverSchema,
    },
    driver: {
        type: driverSchema,
    },
    car: {
        type: carSchema,
    },
    status: {
        type: String,
    },
    check_code: {
        type: String,
    },
    createdAt: {
        type: createdAtSchema,
    },
    updatedAt: {
        type: createdAtSchema,
    },
    price: {
        type: Number,
    },
    driver_location: {
        type: locationSchema,
    },
});

tripSchema.index({ driver_location: '2dsphere' });
tripSchema.index({ 'start.pickup_location': '2dsphere' });
tripSchema.plugin(mongoosePaginate);

export default model('trips', tripSchema);
