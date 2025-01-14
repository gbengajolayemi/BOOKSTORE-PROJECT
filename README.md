# Project Name

A RESTful API built with Node.js, Express, and PostgreSQL.

## Project Structure

```
└── Solid/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── middleware/
    ├── tests/
    ├── schema.sql
    └── config/
```

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- mysql
- npm or yarn

### Local Development
1. Clone the repository
```bash
git clone [repository-url]
cd Solid
```

2. Install dependencies
```bash
npm install
```

3. Environment Setup
Create a `.env` file in the root directory with:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database
```

4. Database Setup
- Create a database in mysql
- Run the schema file:
```bash
mysql -U your_username -d your_database -f schema.sql
```

5. Start the application
```bash
npm run dev
```

### Testing
Run tests using:
```bash
npm test
```

## Remote Database Access
For testing purposes, you can connect to my remote development database:

Please contact me if you need the live credentials to my db to test directly without having to create a db 

## API Documentation

### Endpoints

Detailed API documentation is available in the Postman collection attached

#### Key Endpoints:
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- [Add other endpoints...]

## Error Handling
The API uses standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## License
[Your chosen license]

# API Endpoints

## Test Route
- **GET** `/api/test`
  - Response: `Test route is working!`

## Books
- **GET** `/api/books`
- **POST** `/api/books`
  - Payload:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "published_date": "2023-10-01",
      "isbn": "1234567890123",
      "pages": 350,
      "cover": "http://example.com/cover.jpg",
      "language": "English"
    }
    ```
- **GET** `/api/books/:id`
- **PUT** `/api/books/:id`
  - Payload:
    ```json
    {
      "title": "Updated Book Title",
      "author": "Updated Author Name",
      "published_date": "2023-10-01",
      "isbn": "1234567890123",
      "pages": 350,
      "cover": "http://example.com/cover.jpg",
      "language": "English"
    }
    ```
- **DELETE** `/api/books/:id`

## Authors
- **GET** `/api/authors`
- **POST** `/api/authors`
  - Payload:
    ```json
    {
      "name": "Author Name",
      "bio": "Author Biography"
    }
    ```
- **GET** `/api/authors/:id`
- **PUT** `/api/authors/:id`
  - Payload:
    ```json
    {
      "name": "Updated Author Name",
      "bio": "Updated Author Biography"
    }
    ```
- **DELETE** `/api/authors/:id`

## Categories
- **GET** `/api/categories`
- **POST** `/api/categories`
  - Payload:
    ```json
    {
      "name": "Category Name",
      "description": "Category Description"
    }
    ```
- **GET** `/api/categories/:id`
- **PUT** `/api/categories/:id`
  - Payload:
    ```json
    {
      "name": "Updated Category Name",
      "description": "Updated Category Description"
    }
    ```
- **DELETE** `/api/categories/:id`

# Bookstore API

A RESTful API for managing a bookstore's books, authors, and categories.

## Setup

1. Install dependencies:
```
npm install
```

2. Set up the database:
```
npm run db:setup
```

3. Start the server:
```
npm start
```

## Endpoints

### Books

- `GET /books`: Get a list of all books.
- `POST /books`: Add a new book.
- `GET /books/:id`: Get a book by ID.
- `PUT /books/:id`: Update a book by ID.
- `DELETE /books/:id`: Delete a book by ID.

### Authors

- `GET /authors`: Get a list of all authors.
- `POST /authors`: Add a new author.
- `GET /authors/:id`: Get an author by ID.
- `PUT /authors/:id`: Update an author by ID.
- `DELETE /authors/:id`: Delete an author by ID.

### Categories

- `GET /categories`: Get a list of all categories.
- `POST /categories`: Add a new category.
- `GET /categories/:id`: Get a category by ID.
- `PUT /categories/:id`: Update a category by ID.
- `DELETE /categories/:id`: Delete a category by ID.

# API Endpoints

## Test Route
- **GET** `/api/test`
  - Response: `Test route is working!`

## Books
- **GET** `/api/books`
- **POST** `/api/books`
  - Payload:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "category": "Category Name"
    }
    ```
- **GET** `/api/books/:id`
- **PUT** `/api/books/:id`
  - Payload:
    ```json
    {
      "title": "Updated Book Title",
      "author": "Updated Author Name",
      "category": "Updated Category Name"
    }
    ```
- **DELETE** `/api/books/:id`

## Authors
- **GET** `/api/authors`
- **POST** `/api/authors`
  - Payload:
    ```json
    {
      "name": "Author Name",
      "bio": "Author Biography"
    }
    ```
- **GET** `/api/authors/:id`
- **PUT** `/api/authors/:id`
  - Payload:
    ```json
    {
      "name": "Updated Author Name",
      "bio": "Updated Author Biography"
    }
    ```
- **DELETE** `/api/authors/:id`

## Categories
- **GET** `/api/categories`
- **POST** `/api/categories`
  - Payload:
    ```json
    {
      "name": "Category Name",
      "description": "Category Description"
    }
    ```
- **GET** `/api/categories/:id`
- **PUT** `/api/categories/:id`
  - Payload:
    ```json
    {
      "name": "Updated Category Name",
      "description": "Updated Category Description"
    }
    ```
- **DELETE** `/api/categories/:id`
