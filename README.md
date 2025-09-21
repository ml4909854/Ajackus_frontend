🧑‍💻 User Management Dashboard

A responsive full-stack User Management Dashboard that allows you to create, read, update, and delete (CRUD) users efficiently. Built with React.js frontend and Node.js + Express.js backend, with MongoDB Atlas as the database.

This dashboard is mobile-friendly, tablet-ready, and desktop-compatible, providing an intuitive interface for managing user data.

🔗 Live Demo

Frontend deployed on Vercel: https://ajackus-frontend-pi.vercel.app/

Backend deployed on Render (API live): [Render backend link]

🛠️ Technologies Used

Frontend: React.js, HTML5, CSS3, JavaScript

Backend: Node.js, Express.js

Database: MongoDB Atlas

Other: CORS, Helmet (security), dotenv (environment variables)

🌟 Key Features
1️⃣ User Management (CRUD)

Create Users: Add new users with First Name, Last Name, Email, and Department.

Read Users: View all users in a structured table.

Update Users: Edit user details directly.

Delete Users: Remove users instantly with confirmation.

2️⃣ Table Functionality

Search/Filter: Quickly search users by name, email, or department.

Sort: Sort users by first name, last name, email, or department (ascending/descending).

Limit: Control the number of users displayed per page (5, 10, 25, 50).

Pagination: Navigate large datasets easily.

3️⃣ Responsive & Mobile-Friendly

Fully responsive design for mobile phones, tablets, and desktops.

On mobile, the user form is static for better usability.

Horizontal scrolling table for small screens ensures data visibility.

4️⃣ Form Validation

All input fields are mandatory.

Email format validation ensures correct entries.

Duplicate email check prevents conflicts.

5️⃣ Security & Performance

CORS enabled for safe frontend-backend communication.

Helmet middleware adds essential security headers.

Environment variables store sensitive data securely.

6️⃣ Easy Integration

Frontend communicates with backend via RESTful API.

Real-time updates on the dashboard without page reloads.
