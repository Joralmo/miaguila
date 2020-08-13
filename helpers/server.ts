import express, { Application } from 'express';
import cors from 'cors';

export default class Server {
    private static _instance: Server;

    public app: Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
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
