import pool from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2';

export interface Category {
    id?: number;
    name: string;
    description: string;
}

export class CategoryModel {
    async create(category: Category): Promise<Category> {
        const [result] = await pool.query<OkPacket>('INSERT INTO categories (name, description) VALUES (?, ?)', [category.name, category.description]);
        return { id: result.insertId, ...category };
    }

    async findAll(): Promise<Category[]> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM categories');
        return rows as Category[];
    }

    async findById(id: number): Promise<Category | null> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM categories WHERE id = ?', [id]);
        return rows.length ? (rows[0] as Category) : null;
    }

    async update(id: number, category: Partial<Category>): Promise<boolean> {
        const [result] = await pool.query<OkPacket>('UPDATE categories SET name = ?, description = ? WHERE id = ?', [category.name, category.description, id]);
        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<OkPacket>('DELETE FROM categories WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
