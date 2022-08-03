import express from 'express';
import {body} from 'express-validator';
import {CommonRoutesConfig} from '../common/common.routes.config';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware'
import BooksController from './controllers/books.controller';
import BooksMiddleware from './middleware/books.middleware';

export class BooksRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'BooksRoutes');
    }

    configureRoutes(): express.Application {
        this.app
        .route(`/books`)
        .get(BooksController.listBooks)
        .post(
            body('title').isString(),
            body('author').isString(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            BooksController.createBook
        );
    
        this.app.param(`bookId`, BooksMiddleware.extractBookId);
        this.app.route(`/books/:bookId`)
        .all(BooksMiddleware.validateBookExists)
        .get(BooksController.getBookById)
        .delete(BooksController.removeBook);

        this.app.put(`/books/:bookId`, [
            body('title').isString(),
            body('author').isString(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            BooksController.put,
        ]);

        this.app.patch(`/books/:bookId`, [
            body('title').isString().optional(),
            body('author').isString().optional(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            BooksController.patch,
        ]);

        return this.app;
    }

}