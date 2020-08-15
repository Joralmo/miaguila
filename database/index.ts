import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

export default class Database {
    private static instance: Database;
    public conn: any = null;
    private options: mongoose.ConnectionOptions;
    private constructor() {
        if (process.env.NODE_ENV === 'dev') {
            dotenv.config({ path: path.join(__dirname, '../env/env.dev') });
        } else {
            dotenv.config({ path: path.join(__dirname, '../env/env.prod') });
        }
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
