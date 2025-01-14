import pool from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2';

export interface Book {
  id?: number;
  title: string;
  authorId: number;
  categoryId: number;
  publicationYear: number;
  isbn: string;
  pages: number;
  cover: string;
  language: string;
}

export class BookModel {
  async create(book: Book): Promise<Book> {
    const [result] = await pool.query<OkPacket>('INSERT INTO books SET ?', book);
    return { id: result.insertId, ...book };
  }

  async findAll(): Promise<any[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM books');
    return rows;
  }

  async findById(id: number): Promise<any> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
  }

  async update(id: number, book: any): Promise<boolean> {
    const [result] = await pool.query<OkPacket>('UPDATE books SET ? WHERE id = ?', [book, id]);
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<OkPacket>('DELETE FROM books WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}
