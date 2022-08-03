import express from 'express';
import bookService from '../services/books.service';

class BooksMiddleware {
    async validateBookExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const book = await bookService.readById(req.params.bookId);
        if (book) {
            res.locals.book = book;
            next();
        } else {
            res.status(404).send({
                errors: [`Book ${req.params.bookId} not found`],
            });
        }
    }

    async extractBookId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.bookId;
        next();
    }
}

export default new BooksMiddleware();