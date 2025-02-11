Learning Management System (LMS) - MERN Stack

📌 Overview

This is a Learning Management System (LMS) built using the MERN Stack (MongoDB, Express, React, and Node.js). The system includes a Super Admin and multiple Students who can access educational content. The project supports authentication, course management, and user roles.

🚀 Features

User Authentication (Super Admin & Student Login)

Formik & Yup for Form Validation

Bootstrap for Responsive UI

MongoDB as Database 

Admin Dashboard for Managing Content

Video Upload & Playback

Secure Routes for Protected Pages

Auto-Increment ID for User Registration

🛠️ Tech Stack

Frontend:

React.js

Bootstrap

Formik & Yup (Form Handling & Validation)

Axios (API Requests)

Backend:

Node.js

Express.js

MongoDB (Without Mongoose)

JWT Authentication

Multer (File Uploads)

📂 Folder Structure

LMS-Project/
│── backend/         # Express.js Server (API)
│   │── uploads/        # Uploaded Files (Videos, Images)
│── frontend/        # React App
│── README.md       # Project Documentation

🔧 Installation & Setup

1. Clone the Repository

git clone https://github.com/yourusername/lms-project.git
cd lms-project

2. Backend Setup

cd backend
npm install
npm start

Server will run at http://127.0.0.1:5000

3. Frontend Setup

cd frontend
npm install
npm start

React app will run at http://127.0.0.1:3000

🔐 Authentication

Users need to log in to access the dashboard.

Super Admin can manage categories and users.

Students can view courses.

Uses JWT Token for authentication.

📜 API Endpoints

Authentication

POST /registerStd → Register a new student

POST /login → Login user & generate JWT

Protected Routes

GET /adminDashboard → Only accessible by Super Admin

GET /studentDashboard → Only accessible by Students

File Uploads

POST /uploadVideo → Upload a video

GET /uploads/videos/:filename → Access uploaded videos

🏗️ Future Enhancements

Course Progress Tracking

Live Video Classes Integration

Multiple User Roles (Instructors, Admins, etc.)

Improved UI/UX

📜 License

This project is open-source. Feel free to contribute!