# Assignment Submission Portal

This is a backend system for an assignment submission portal, allowing users to upload assignments and admins to manage them. The system uses Node.js, Express, and MongoDB, and includes user authentication.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (either locally or using MongoDB Atlas)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/divyang-20/growthx_assignment
   cd growthx_assignment

## Environment Variables

Create a .env file in the root of your project directory and add the following variables:

MONGO_URI=(your-mongodb-uri) This is the connection string for your MongoDB database. If you are using MongoDB Atlas, you can get the connection string from your Atlas dashboard.

JWT_SECRET=(your-secret-key) This is a secret key used for signing JSON Web Tokens. You can use any random string as the value.

## Running the Application

1. **Start the server:**
   ```bash
   npm start

1. **Access the Application:**
   
   The server will run on http://localhost:5000
