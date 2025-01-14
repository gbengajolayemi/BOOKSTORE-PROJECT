import request from 'supertest';
import express, { Request, Response } from 'express';
import { jsonParser, validateBook, validateAuthor, handleDatabaseErrors } from '../src/middleware/validation';

const app = express();
app.use(jsonParser);
app.post('/books', validateBook, (req: Request, res: Response) => res.status(200).send('Book is valid'));
app.post('/authors', validateAuthor, (req: Request, res: Response) => res.status(200).send('Author is valid'));
app.use(handleDatabaseErrors);

describe('Validation Middleware', () => {
  it('should validate book data and return 200 for valid input', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        title: 'Test Book',
        authorId: 1,
        categoryId: 1,
        publicationYear: 2021,
        isbn: '1234567890',
        pages: 100,
        cover: 'Hardcover',
        language: 'English'
      });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Book is valid');
  });

  it('should return 400 for invalid book data', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        title: '',
        authorId: 'invalid',
        categoryId: 'invalid',
        publicationYear: 'invalid',
        isbn: '',
        pages: 'invalid',
        cover: '',
        language: ''
      });
    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(8);
  });

  it('should validate author data and return 200 for valid input', async () => {
    const response = await request(app)
      .post('/authors')
      .send({
        name: 'Test Author',
        biography: 'Test Biography'
      });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Author is valid');
  });

  it('should return 400 for invalid author data', async () => {
    const response = await request(app)
      .post('/authors')
      .send({
        name: ''
      });
    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(1);
  });
});
