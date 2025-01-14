import { Request, Response } from 'express';
import { AuthorModel } from '../models/Author';

export class AuthorController {
    private authorModel = new AuthorModel();

    async createAuthor(req: Request, res: Response): Promise<Response> {
        const { name, biography } = req.body; 
        try {
            const author = await this.authorModel.create({ name, biography });
            return res.status(201).send({ message: 'Author created successfully', author });
        } catch (error) {
            return res.status(500).send({ message: 'Failed to create author', error });
        }
    }

    async getAuthors(req: Request, res: Response): Promise<Response> {
        try {
            const authors = await this.authorModel.findAll();
            return res.status(200).send(authors);
        } catch (error) {
            return res.status(500).send({ message: 'Failed to fetch authors', error });
        }
    }

    async getAuthorById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const author = await this.authorModel.findById(Number(id));
            if (!author) {
                return res.status(404).send({ message: 'Author not found' });
            }
            return res.status(200).send(author);
        } catch (error) {
            return res.status(500).send({ message: 'Failed to fetch author', error });
        }
    }

    async updateAuthor(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, biography } = req.body; 
        try {
            const success = await this.authorModel.update(Number(id), { name, biography });
            if (!success) {
                return res.status(404).send({ message: 'Author not found' });
            }
            const updatedAuthor = await this.authorModel.findById(Number(id));
            return res.status(200).send(updatedAuthor);
        } catch (error) {
            return res.status(500).send({ message: 'Failed to update author', error });
        }
    }

    async deleteAuthor(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const success = await this.authorModel.delete(Number(id));
            if (!success) {
                return res.status(404).send({ message: 'Author not found' });
            }
            return res.status(200).send({ message: 'Author deleted successfully' });
        } catch (error) {
            return res.status(500).send({ message: 'Failed to delete author', error });
        }
    }
}
