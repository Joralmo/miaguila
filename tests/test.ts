import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../app';

chai.use(chaiHttp);
chai.should();

describe('index', () => {
    it('should get text from server running', done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('Make it better :D');
                done();
            });
    });
});

describe('totalTrips', () => {
    it('should get a number of total trips registers', done => {
        chai.request(app)
            .get('/trips/total')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.quantity.should.be.a('number');
                done();
            });
    });
});

describe('totalTripsByCity', () => {
    it('should get a number of trips register for specific city', done => {
        chai.request(app)
            .get('/trips/Bogotá')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.quantity.should.be.a('number');
                done();
            });
    });

    it('should get a message for not found city and status 404', done => {
        chai.request(app)
            .get('/trips/Ciénaga')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.message.should.equal('City not found');
                done();
            });
    });
});

describe('updateTrip', () => {
    it('should get status 404 and message for not found trip', done => {
        chai.request(app)
            // Se espera que este _id no exista en la base de datos
            .put('/trips/5f35ad9a4da6090e95f36e98')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.message.should.equal('Trip not found');
                done();
            });
    });
});

describe('dynamicRate', () => {
    it('should get number equivalent to the multiplier for the dynamic rate', done => {
        chai.request(app)
            .post('/trips/dynamic-rate')
            .send({ lat: 4.6969446, lng: -74.1426223 })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.dynamic_rate.should.be.a('number');
                done();
            });
    });

    it('should get status 400 and message for missing parameters', done => {
        chai.request(app)
            .post('/trips/dynamic-rate')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.message.should.equal('lat or lng missing');
                done();
            });
    });
});
