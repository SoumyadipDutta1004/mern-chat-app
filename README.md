# Chatty - Real-Time MERN Stack Chat Application

A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) allowing users to communicate instantly with message and image sharing capabilities.

## Features

- **User Authentication:** Secure signup, login, and logout functionality
- **Real-Time Messaging:** Instant message delivery
- **Profile Management:** Personalize your profile with a custom avatar
- **Image Sharing:** Send images in conversations
- **Responsive Design:** Works on desktop and mobile devices

## Technology Stack

### Frontend
- **React 19** - UI library
- **Zustand** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **DaisyUI** - UI component library
- **React Hook Form** - Form handling
- **Axios** - API requests
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage and management

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SoumyadipDutta1004/mern-chat-app.git
   cd mern-chat-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` directory with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Run the application**
   
   In the server directory:
   ```bash
   npm run dev
   ```
   
   In the client directory:
   ```bash
   npm run dev
   ```

6. **Open your browser and navigate to**
   ```
   http://localhost:5173
   ```


## Author
Made with ❤️ by Soumyadip Dutta

