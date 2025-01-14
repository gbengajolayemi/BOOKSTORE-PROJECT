import pool from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2';

export interface Author {
    id?: number;
    name: string;
    biography: string; 
}

export class AuthorModel {
    async create(author: Author): Promise<Author> {
        const [result] = await pool.query<OkPacket>('INSERT INTO authors (name, biography) VALUES (?, ?)', [author.name, author.biography]);
        return { id: result.insertId, ...author };
    }

    async findAll(): Promise<Author[]> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM authors');
        return rows as Author[];
    }

    async findById(id: number): Promise<Author | null> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM authors WHERE id = ?', [id]);
        return rows.length ? (rows[0] as Author) : null;
    }

    async update(id: number, author: Partial<Author>): Promise<boolean> {
        const [result] = await pool.query<OkPacket>('UPDATE authors SET name = ?, biography = ? WHERE id = ?', [author.name, author.biography, id]);
        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<OkPacket>('DELETE FROM authors WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
