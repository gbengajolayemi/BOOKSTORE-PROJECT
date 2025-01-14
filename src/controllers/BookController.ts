import { Request, Response } from 'express';
import { BookModel } from '../models/Book';

export class BookController {
  private bookModel = new BookModel();

  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookModel.create(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error creating book', error });
    }
  }

  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookModel.findAll();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books', error });
    }
  }

  async getBookById(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookModel.findById(Number(req.params.id));
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching book', error });
    }
  }

  async updateBook(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.bookModel.update(Number(req.params.id), req.body);
      if (!success) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      const updatedBook = await this.bookModel.findById(Number(req.params.id));
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: 'Error updating book', error });
    }
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.bookModel.delete(Number(req.params.id));
      if (!success) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting book', error });
    }
  }
}
