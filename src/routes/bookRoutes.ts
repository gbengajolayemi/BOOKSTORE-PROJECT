import express, { Request, Response } from 'express';
import { BookController } from '../controllers/BookController';
import { validateBook } from '../middleware/validation';
import { logger } from '../utils/logger';

const router = express.Router();
const bookController = new BookController();

router.post('/', validateBook, (req: Request, res: Response) => bookController.createBook(req, res));
router.get('/', (req: Request, res: Response) => bookController.getAllBooks(req, res));
router.get('/:id', (req: Request, res: Response) => bookController.getBookById(req, res));
router.put('/:id', validateBook, (req: Request, res: Response) => bookController.updateBook(req, res));
router.delete('/:id', (req: Request, res: Response) => bookController.deleteBook(req, res));

export default router;
