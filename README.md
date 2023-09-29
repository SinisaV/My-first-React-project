# Image Sharing Web Application

This web application allows users to register, log in, and share images with a title, address, and file. Users can view a list of submitted images, like images, add comments, and view detailed information about each image. The application is built using the React framework for the frontend and Express framework for the server-side functionality.

## Installation and Usage

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/SinisaV/My-first-React-project.git
   ```

2. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   cd frontend
   npm install
   ```

3. **Configure MongoDB:**
   - Ensure MongoDB is running.
   - Configure the MongoDB connection in `server/config/db.js`.

4. **Start the Application:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   - Open your browser and go to `http://localhost:3000` to access the application.
  
## Features

- **User Registration and Login:** Users can register and log in to their accounts.

- **Image Submission:** Registered users can submit images with titles, addresses, and files.

- **Image Listing:** Public users can view a list of submitted images with titles, uploaders' names, upload dates, and likes. Images are sorted by upload time, with the freshest images at the top.

- **Image Details:** Users can click on an image to view detailed information, including comments. Logged-in users can vote for the image and add comments.

- **User Profile:** Users have profiles displaying their data, the number of posts, and the total number of likes received for all posts.

## Prerequisites

- **Node.js:** JavaScript runtime for building the application.
- **Express:** Backend framework for handling server-side logic.
- **React:** Frontend framework for building user interfaces.
- **MongoDB:** Database for storing user data, images, and votes.
- **Additional Packages:** Various packages for server and client-side functionalities.
