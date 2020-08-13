import mongoose from 'mongoose';

export default class Database {
    private static instance: Database;
    public conn: any = null;
    private options: mongoose.ConnectionOptions;
    private constructor() {
        this.options = {
            bufferCommands: false,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: 'root',
            pass: 'example',
            dbName: 'miaguila',
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
                    .connect('mongodb://localhost:27017/admin', this.options)
                    .catch(err => {
                        throw new Error(err);
                    });
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}
