import BooksDao from '../daos/books.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { BookDto } from '../dto/book.dto';
import { PatchBookDto } from '../dto/patch.book.dto';

class BooksService implements CRUD {
    async create(resource: BookDto) {
        return BooksDao.addUser(resource);
    }

    async deleteById(id: string) {
        return BooksDao.removeBookById(id);
    }

    async list(limit: number, page: number) {
        return BooksDao.getBooks();
    }

    async patchById(id: string, resource: PatchBookDto) {
        return BooksDao.patchBookById(id, resource);
    }

    async readById(id: string) {
        return BooksDao.getBookById(id);
    }

    async putById(id: string, resource: BookDto) {
        return BooksDao.putBookById(id, resource);
    }
}

export default new BooksService();
