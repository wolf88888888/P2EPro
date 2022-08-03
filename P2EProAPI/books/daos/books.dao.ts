
import debug from 'debug';
import { v4 as uuidv4 } from 'uuid';
import { BookDto } from '../dto/book.dto';
import { PatchBookDto } from '../dto/patch.book.dto';
import dbService, { DBData } from '../../common/services/db.service';

const log: debug.IDebugger = debug('app:in-memory-dao');

class BooksDao {
    constructor() {
        log('Created new instance of BooksDao');
    }

    async getBooks() {
        const { books } = dbService.getDB().data as DBData;
        return books;
    }
    
    async getBookById(bookId: string) {
        const { books } = dbService.getDB().data as DBData;
        const book = books.find((b) => b.id === bookId)
        return book;
    }

    async addUser(book: BookDto) {
        const { books } = dbService.getDB().data as DBData;
        book.id = uuidv4();
        books.push(book);
        await dbService.getDB().write();
        return book.id;
    }

    async putBookById(bookId: string, book: BookDto) {
        const { books } = dbService.getDB().data as DBData;
        const objIndex = books.findIndex(
            (obj: { id: string }) => obj.id === bookId
        );
        books.splice(objIndex, 1, book);
        await dbService.getDB().write();
        return `${book.id} updated via put`;
    }

    async patchBookById(bookId: string, book: PatchBookDto) {
        const { books } = dbService.getDB().data as DBData;
        const objIndex = books.findIndex(
            (obj: { id: string }) => obj.id === bookId
        );
        let currentBook = books[objIndex];
        const allowedPatchFields = [
            'title',
            'author',
        ];
        for (let field of allowedPatchFields) {
            if (field in book) {
                // @ts-ignore
                currentBook[field] = book[field];
            }
        }
        books.splice(objIndex, 1, currentBook);
        await dbService.getDB().write();
        return `${book.id} patched`;
    }

    async removeBookById(bookId: string) {
        const { books } = dbService.getDB().data as DBData;
        const objIndex = books.findIndex(
            (obj: { id: string }) => obj.id === bookId
        );
        books.splice(objIndex, 1);
        return `${bookId} removed`;
    }
}

export default new BooksDao();