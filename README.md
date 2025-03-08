# METN API
MongoDB, Express, TypeScript and NodeJS API project.

This repository contains the REST API project source code made with technologies listed above.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/otabekoff/metn-api.git
   cd metn-api
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```sh
   PORT=8080
   MONGO_URL=your_mongo_url
   COOKIE_DOMAIN=localhost
   ```

4. Start the development server:
   ```sh
   npm start
   # or
   yarn start
   ```

### Usage
- The server will be running on `http://localhost:8080/`
- Use tools like Postman or Insomnia to interact with the API

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user

### Users
- `GET /users` - Get all users
- `PATCH /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

## Environment Variable Management
- The project uses `dotenv` to manage environment variables. Ensure you have a `.env` file in the root directory with the necessary variables.

## Schema Validation
- The project uses `joi` for schema validation. Refer to the code in `src/controllers` and `src/db` for examples of how validation is implemented.

## Password Hashing
- The project uses `bcrypt` for password hashing. Refer to the code in `src/controllers/authentication.ts` and `src/db/users.ts` for examples of how password hashing is implemented.
