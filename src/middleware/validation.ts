import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// Middleware for JSON parsing
export const jsonParser = bodyParser.json();

// Middleware for logging
export const logger = morgan('dev');

export const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('authorId').isInt().withMessage('Author ID must be an integer'),
  body('categoryId').isInt().withMessage('Category ID must be an integer'),
  body('publicationYear').isInt().withMessage('Publication Year must be an integer'),
  body('isbn').notEmpty().withMessage('ISBN is required'),
  body('pages').isInt().withMessage('Pages must be an integer'),
  body('cover').notEmpty().withMessage('Cover is required'),
  body('language').notEmpty().withMessage('Language is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateAuthor = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('biography').optional().trim(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateCategory = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


export const handleDatabaseErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ error: 'Invalid foreign key value' });
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0].path;
    return res.status(400).json({ error: `Duplicate value for field: ${field}` });
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};
