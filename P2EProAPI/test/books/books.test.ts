
import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';

let testBookId = '';
const testBookBody = {
    title: 'BOOK TITLE',
    author: 'AUTHOR',
};

const newTitle = 'BOOK NEW TITLE';
const newAuthor = 'BOOK NEW AUTHOR';

describe('books endpoints', function () {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });
    after(function (done) {
        // shut down the Express.js server, close our DB connection, then tell Mocha we're done:
        app.close(() => {
            done();
        });
    });

    it('POST to /books', async function () {
        const res = await request.post('/books').send(testBookBody);

        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        testBookId = res.body.id;
    });

    it('GET to /books', async function () {
        const res = await request
            .get(`/books`)
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
    });

    it('GET from /books/:bookId', async function () {
        const res = await request
            .get(`/books/${testBookId}`)
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id).to.equal(testBookId);
        expect(res.body.title).to.equal(testBookBody.title);
        expect(res.body.author).to.equal(testBookBody.author);
    });
    
    it('PATCH to /books/:bookId with an nonexistent ID', async function () {
        const res = await request
            .patch(`/books/do-not-exist`)
            .send({
                title: newTitle,
            });
        expect(res.status).to.equal(404);
    });

    it('PATCH to /books/:bookId', async function () {
        const res = await request
            .patch(`/books/${testBookId}`)
            .send({
                title: newTitle,
            });
        expect(res.status).to.equal(204);
    });

    it('PUT to /books/:bookId with an nonexistent ID', async function () {
        const res = await request
            .put(`/books/do-not-exist`)
            .send({
                title: newTitle,
                author: newAuthor,
            });
        expect(res.status).to.equal(404);
    });

    it('PUT to /books/:bookId', async function () {
        const res = await request
            .put(`/books/${testBookId}`)
            .send({
                title: newTitle,
                author: newAuthor,
            });
        expect(res.status).to.equal(204);
    });

    it('GET from /books/:bookId and should have a new details', async function () {
        const res = await request
            .get(`/books/${testBookId}`)
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id).to.equal(testBookId);
        expect(res.body.title).to.equal(newTitle);
        expect(res.body.author).to.equal(newAuthor);
    });

    it('DELETE from /books/:bookId', async function () {
        const res = await request
            .delete(`/books/${testBookId}`)
            .send();
        expect(res.status).to.equal(204);
    });
});