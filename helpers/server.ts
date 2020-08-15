import express, { Application } from 'express';
import cors from 'cors';
import initConfig from '../config';

export default class Server {
    private static _instance: Server;

    public app: Application;
    public port: number;

    constructor() {
        initConfig();
        this.app = express();
        this.port = Number(process.env.PORT_TEST) || Number(process.env.APP_PORT);
        this.app.use(cors());
        this.app.use(express.json());
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}
