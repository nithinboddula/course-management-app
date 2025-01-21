# Captico API

Captico API is a backend service built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**. It provides a RESTful API for managing courses and users, including authentication via JWT tokens.

## Features:

- **User Registration & Login** with hashed passwords.
- **Course Management**: Create, Update, Delete, and View courses.
- **Authorization Middleware** to protect routes with JWT tokens.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Routes](#routes)
4. [Authentication Middleware](#authentication-middleware)
5. [Tech Stack](#tech-stack)

---

## **Installation**:

### Prerequisites:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/)) must be installed on your machine.
- MongoDB instance (MongoDB Atlas or local MongoDB instance).

### Steps to set up:

1.  **Clone the repository**:

    ```
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies**:
    ```
    npm install
    ```
3.  **Set up MongoDB connection**:

    - Replace the MongoDB URI in the app.js file with your own MongoDB Atlas connection string or a local MongoDB URI:

    ```
    mongoose.connect(
    "your-mongo-connection-string"
    )
    ```

4.  **Set your JWT secret key**:

    - Replace "secret_key" in the authMiddleware.js and login route with your own secret string.

## **Usage**:

    Start the server by running:

    npm start

    The server will run on http://localhost:5000 by default.

## **Routes**

### 1. **User Authentication**

#### **POST /api/auth/register**

- **Description**: Register a new user.
- **Request body**:
  ```json
  {
    "username": "user123",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Response:

**200 if successful:**

         {
         "token": "jwt_token_here",
         "user": {
             "username": "user123",
             "email": "user@example.com"
         }
         }

**401 if invalid credentials:**

         {
         "message": "Invalid credentials"
         }

### 2. **Courses Management**

#### **POST /api/routes/createCourse**

- **Description**: Create a new course (protected by JWT).
- **Request body**:

            {

            "courseId": "123",

            "courseName": "Course Name",

            "description": "Course Description",

            "instructorName": "Instructor Name",

            "price": 100

            }

### **GET /api/routes/courses**

- **Description**: Get all courses (protected by JWT).

### **GET /api/routes/course/:id**

- **Description**: Get a course by its ID (protected by JWT).

### **DELETE /api/routes/course/:id**

- **Description**: Delete a course by its ID (protected by JWT).

### **PUT /api/routes/course/:id**

- **Description**: Update a course by its ID (protected by JWT).
- **Request body**:

            {
                "courseId": "123",
                "courseName": "Updated Course Name",
                "description": "Updated Description",
                "instructorName": "Updated Instructor Name",
                "price": 150
            }

## Authentication Middleware

The `authMiddleware.js` is used to protect routes by ensuring that the user is authenticated with a valid JWT token. The middleware:

1. Extracts the token from the `Authorization` header.
2. Verifies the token using `jwt.verify()`.
3. Fetches the corresponding user from the database.
4. Attaches the user to the `req` object, allowing access to protected routes.

### Example Usage:

To protect any route, simply add `authMiddleware` as middleware in the route definition:

```js
router.post("/createCourse", authMiddleware, async (req, res) => {
  // Route logic here
});
```

## Tech Stack

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database to store user and course data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **bcrypt**: Library for hashing passwords.
- **JWT (jsonwebtoken)**: Library for creating and verifying JWT tokens.
- **CORS**: Middleware to handle cross-origin requests.
