
---

# KaalScheduler

This project is a comprehensive web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a platform for managing course schedules and timetables efficiently. Users can register, log in, and create personalized timetables for their courses. The application utilizes JSON Web Tokens (JWT) for authentication, ensuring secure access to user-specific data.

![icon](https://res.cloudinary.com/dvvzlzude/image/upload/v1709471590/brand_qfxy9s.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Timetable Generation](#timetable-generation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Brief project introduction goes here.

## Features

- Login
- Registration
- Add Courses
- Add Teachers
- Generate timetables

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- JWT for authentication

## Setup

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AasthaYaduvanshi/kaalSchedular-Project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd KaalScheduler
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables on Backend:
   
   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=your_secret_key
   MONGO_URL=your_mongodb_uri
   ACCESS_TOKEN_SECRET=access_token
   REFRESH_TOKEN_SECRET=refresh_token
   ```

## Usage

### Authentication

The project includes user authentication functionality with login and register endpoints.

- **Register**: `/api/auth/register` - Allows users to register with a username and password.
- **Login**: `/api/auth/login` - Allows registered users to log in and receive JWT tokens for authentication.

### Timetable Generation

The project provides a timetable generation algorithm to create schedules for courses based on provided parameters.

```javascript
// Example usage of timetable generation function
const courses = [...]; // Array of course objects
const selectedRooms = [...]; // Array of selected rooms
const days = [...]; // Array of days

const timetables = GenerateFunction(courses, selectedRooms, days);
console.log(timetables);
```

## Screenshots

![Home](https://res.cloudinary.com/dvvzlzude/image/upload/v1709470667/53e5a1a5-86fe-4227-be59-ca5f9bcaf59b.png)
![Login](https://res.cloudinary.com/dvvzlzude/image/upload/v1709470740/aff7b4c2-b039-4d85-b44e-b210a6586ae8.png)
![Create Course](https://res.cloudinary.com/dvvzlzude/image/upload/v1709470770/bcd8d015-33c4-4b67-b45f-7e6f8b4d02fc.png)
![Generate Page](https://res.cloudinary.com/dvvzlzude/image/upload/v1709470835/ec11df34-0a27-4693-b671-82d17f90bf81.png)
![Generated timetable](https://res.cloudinary.com/dvvzlzude/image/upload/v1709470881/a0431cd0-2b99-4971-b56e-1310a2da16a9.png)
