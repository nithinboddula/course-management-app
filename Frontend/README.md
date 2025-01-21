# Course Management Application

This is a course management web application built using React, Axios, and React Router. The application allows users to:

- Register an account
- Login to their account
- View, create, edit, and delete courses

The application is designed for administrators or instructors to manage courses, including course name, description, instructor name, and price.

## Features

- **User Authentication**:
  - Users can sign up, log in, and manage their session with JWT tokens.
- **Course Management**:

  - View a list of courses.
  - Create a new course.
  - Edit an existing course.
  - Delete a course.

- **Protected Routes**:
  - Some routes are protected, requiring users to be logged in to access them.

## Technologies Used

- **Frontend**:

  - React
  - React Router
  - Axios
  - React Bootstrap
  - FontAwesome

- **Backend** (not included in this repository):
  - Node.js
  - Express.js
  - MongoDB (for database)

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Step-by-Step Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/course-management-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd course-management-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm start
   ```

   This will start the application at `http://localhost:3000`.

## Usage

Once the application is running, you can:

- **Sign Up**: Click the **Sign Up** button to create a new account.
- **Login**: Log in with your credentials after signing up.
- **Create Course**: After logging in, click **Create Course** to add a new course.
- **View Course**: Click on **View** next to a course to see the details.
- **Edit Course**: Click the edit icon to modify course information.
- **Delete Course**: Click the delete icon to remove a course.

## API Endpoints

### Authentication Endpoints

- **POST** `/api/auth/register/`: Register a new user.
- **POST** `/api/auth/login/`: Log in with credentials and retrieve a JWT token.

### Course Endpoints

- **GET** `/api/auth/courses`: Fetch all courses (authentication required).
- **POST** `/api/auth/createCourse`: Create a new course (authentication required).
- **PUT** `/api/auth/course/:courseId`: Update a specific course (authentication required).
- **DELETE** `/api/auth/course/:courseId`: Delete a course (authentication required).

### Example Request for Login:

```bash
POST http://localhost:5000/api/auth/login/
Content-Type: application/json

{
  "username": "user123",
  "password": "password123"
}
```
