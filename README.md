# MovieBookTvReviewApp

This is a full-stack application built with Angular for the frontend and Express.js with MongoDB for the backend. The application allows users to browse, review, and favorite TV shows. Users can sign up, log in, and manage their favorite shows, while admins have additional privileges such as adding or deleting shows.

## Features

- **User Authentication**: Users can sign up and log in using JWT-based authentication.
- **TV Show Management**: Admin users can add, edit, and delete TV shows.
- **Favorites Management**: Registered users can add TV shows to their favorites list.
- **Role-Based Access**: Different access levels for regular users and admins.
- **Server-Side Rendering**: The app supports SSR for better SEO and performance.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [Angular CLI](https://angular.io/cli) (version 17.3.4)
- [MongoDB](https://www.mongodb.com/try/download/community) (Ensure that MongoDB is running locally or adjust the connection string to use a remote MongoDB instance)

## Development server

### Frontend

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run the Angular Development Server**:
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Backend

1. **Navigate to the `server` directory**:
   ```bash
   cd server
   ```
2. **Install Backend Dependencies**:
   ```bash
   npm install
   ```
3. **Start the Express Server**:
   ```bash
   node server.js
   ```
   The server will start on `http://localhost:4000/`.

### Combined Setup

To run both frontend and backend together during development, open two terminals: one for the frontend and one for the backend, and execute the above commands simultaneously.

## MongoDB Setup

1. **Start MongoDB**:
   Ensure that MongoDB is running. You can start MongoDB with:
   ```bash
   mongod
   ```
2. **Create a Database**:
   No manual setup is required in MongoDB as the application will automatically create the necessary collections (`users` and `tvshows`) when you register a user or add a TV show.

## Build

Run `ng build` to build the Angular project. The build artifacts will be stored in the `dist/` directory. To build the project for production with server-side rendering:

```bash
ng build && ng run server:server
```

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Deployment

1. **Build the Project**:
   ```bash
   ng build --configuration production
   ```
2. **Start the Node.js Server**:
   ```bash
   node server/server.js
   ```
   The application will be served at `http://localhost:4000/`.

## API Endpoints

### User Registration

- **URL**: `/api/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "yourusername",
    "email": "youremail@example.com",
    "password": "yourpassword"
  }
  ```
  
### User Login

- **URL**: `/api/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "youremail@example.com",
    "password": "yourpassword"
  }
  ```

### TV Shows

- **Get All TV Shows**: `GET /api/tvshows`
- **Add a TV Show (Admin only)**: `POST /api/tvshows`
- **Delete a TV Show (Admin only)**: `DELETE /api/tvshows/:id`

### Favorites

- **Add to Favorites**: `POST /api/users/favorites`
- **Get User's Favorites**: `GET /api/users/favorites`
- **Remove from Favorites**: `DELETE /api/users/favorites/:tvShowId`

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
