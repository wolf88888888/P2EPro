import debug from 'debug';
import { Low, JSONFile } from '../../libs/lowdb';

const log: debug.IDebugger = debug('app:db-service');

export interface Book {
    id: string;
    title: string;
    author: string;
}

export interface DBData {
    books: Book[]
}
  
class DatabaseService {
    private count = 0;
    private db: Low<DBData>;

    constructor() {
        const adapter = new JSONFile<DBData>('db.json')
        
        this.db = new Low<DBData>(adapter)
        this.connectWithRetry();
    }

    getDB(): Low<DBData>{
        return this.db;
    }

    connectWithRetry = () => {
        log('Attempting DB connection (will retry if needed)');
        this.db.read()
        .then(() => {
            this.db.data ||= { books: [] }
            log('DB is connected');
        })
        .catch((err) => {
            const retrySeconds = 5;
            log(
                `DB connection unsuccessful (will retry #${++this
                    .count} after ${retrySeconds} seconds):`,
                err
            );
            setTimeout(this.connectWithRetry, retrySeconds * 1000);
        });
    };
}
export default new DatabaseService();