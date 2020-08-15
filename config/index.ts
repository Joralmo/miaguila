import dotenv from 'dotenv';
import path from 'path';

/**
 * Revisa el environment para setear la configuración de dotenv
 */
export default function initConfig() {
    if (process.env.NODE_ENV === 'dev') {
        dotenv.config({ path: path.join(__dirname, '../env/env.dev') });
    } else {
        dotenv.config({ path: path.join(__dirname, '../env/env.prod') });
    }
}
