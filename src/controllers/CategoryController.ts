import { Request, Response } from 'express';
import { CategoryModel } from '../models/Category';

export class CategoryController {
    private categoryModel = new CategoryModel();

    async createCategory(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body;
        try {
            const category = await this.categoryModel.create({ name, description });
            return res.status(201).send({ message: 'Category created successfully', category });
        } catch (error) {
            return res.status(500).send({ message: 'Failed to create category', error });
        }
    }

    async getCategories(req: Request, res: Response): Promise<Response> {
        try {
            const categories = await this.categoryModel.findAll();
            return res.status(200).send(categories);
        } catch (error) {
            return res.status(500).send({ message: 'Failed to fetch categories', error });
        }
    }

    async getCategoryById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const category = await this.categoryModel.findById(Number(id));
            if (!category) {
                return res.status(404).send({ message: 'Category not found' });
            }
            return res.status(200).send(category);
        } catch (error) {
            return res.status(500).send({ message: 'Failed to fetch category', error });
        }
    }

    async updateCategory(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const success = await this.categoryModel.update(Number(id), { name, description });
            if (!success) {
                return res.status(404).send({ message: 'Category not found' });
            }
            const updatedCategory = await this.categoryModel.findById(Number(id));
            return res.status(200).send(updatedCategory);
        } catch (error) {
            return res.status(500).send({ message: 'Failed to update category', error });
        }
    }

    async deleteCategory(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const success = await this.categoryModel.delete(Number(id));
            if (!success) {
                return res.status(404).send({ message: 'Category not found' });
            }
            return res.status(200).send({ message: 'Category deleted successfully' });
        } catch (error) {
            return res.status(500).send({ message: 'Failed to delete category', error });
        }
    }
}
