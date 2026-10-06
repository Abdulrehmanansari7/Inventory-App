# Car Inventory App

A full-stack car inventory management application built with **Node.js, Express, PostgreSQL, and EJS**.

The project allows users to manage companies and their cars, including adding, updating, deleting, and searching inventory.

## Features

- Company and car management
- Add, update, and delete cars
- Search and filter cars
- Server-side form validation
- PostgreSQL database
- Express routing and controllers
- Centralized error handling
- PostgreSQL error handling
- EJS templates for the frontend
- Form validation with `express-validator`

## Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **EJS**
- **express-validator**
- **Tailwind CSS**

## Project Structure

```text
├── controllers/
├── db/
├── middleware/
├── routes/
├── views/
├── public/
├── index.js
└── package.json
```

## Validation

The application uses `express-validator` for server-side validation.

Validation includes:

- Required fields
- Integer and decimal values
- Minimum and maximum values
- String length
- URL parameter validation
- Custom validation rules

Invalid form data is returned to the user with appropriate error messages.

## Error Handling

The project uses centralized Express error handling for:

- 404 routes
- Invalid requests
- PostgreSQL errors
- Foreign key errors
- Invalid database values
- Unexpected server errors

Database errors are converted into simple messages instead of exposing technical database information to the user.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add your PostgreSQL database connection details.

```env
DATABASE_URL=your_database_url
```

### 4. Start the application

```bash
npm start
```

Or, if using Node's watch mode:

```bash
node --watch index.js
```

## What I Learned

This project was built as a backend learning project and helped me practice:

- Express routing
- Middleware
- Controllers
- PostgreSQL queries
- Form handling
- Server-side validation
- Error-handling middleware
- Request parameters and request bodies
- Database error handling
- Organizing an Express application into separate modules

## Future Improvements

- User authentication
- Image uploads for cars
- Pagination
- Better filtering and sorting
- Admin dashboard
- Deployment with a cloud database

## License

This project is for learning and educational purposes.