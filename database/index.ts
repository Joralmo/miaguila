import mongoose from 'mongoose';
import initConfig from '../config';

export default class Database {
    private static instance: Database;
    public conn: any = null;
    private options: mongoose.ConnectionOptions;
    private constructor() {
        initConfig();
        this.options = {
            bufferCommands: false,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
            dbName: process.env.DB_NAME,
        };
        this.conn = null;
    }

    /**
     * Devuelve una instancia de la base de datos en caso de existir sino una nueva
     * @returns { Database } instancia
     */
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    /**
     * method to connect database
     *
     */
    async initDb() {
        if (this.conn === null) {
            try {
                this.conn = await mongoose
                    .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/admin`, this.options)
                    .catch(err => {
                        throw new Error(err);
                    });
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}
