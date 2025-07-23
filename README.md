# 🔐 Node.js Authentication System

A complete full-stack authentication system with JWT tokens, MongoDB integration, and a beautiful admin dashboard.

## ✨ Features

- **🔒 Secure Authentication**: JWT-based login/register with bcrypt password hashing
- **📱 Modern UI**: Responsive design with gradient backgrounds and smooth animations
- **👥 Admin Dashboard**: Real-time user management with statistics and controls
- **🛡️ Security**: CORS support, password encryption, and protected routes
- **📊 Data Management**: MongoDB integration with Mongoose ODM

## 🚀 Tech Stack

**Backend**: Node.js, Express.js, MongoDB, JWT, bcryptjs  
**Frontend**: HTML5, CSS3, Vanilla JavaScript  
**Database**: MongoDB with Mongoose

## 📁 Key Files

```
server.js                    # Main server
config/models/User.js        # User schema
routes/authRoutes.js         # API endpoints  
controllers/authController.js # Auth logic
public/index.html            # Login/Register UI
public/admin.html            # Admin dashboard
```

## 🎯 Quick Start

1. Clone repository
2. `npm install`
3. Configure `.env` with MongoDB URI
4. `npm start`
5. Visit `http://localhost:5000`

## 🌟 Demo Pages

- **Main App**: User registration, login, dashboard
- **Admin Panel**: `/admin.html` - User management with live stats
- **API**: RESTful authentication endpoints

## 🔧 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/me` - Get user profile (protected)
- `GET /api/admin/users` - Admin: view all users

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

## 💡 Perfect For

- Learning authentication concepts
- Foundation for larger applications
- Understanding JWT implementation
- Full-stack development practice

Features include persistent sessions, password validation, error handling, and a professional admin interface for user management. Ready to deploy and extend!

## 📸 Screenshots

### Main Authentication Interface
- Beautiful login/register forms
- Real-time validation
- Smooth animations

### Admin Dashboard
- User management interface
- Live statistics
- Data visualization

---
*Built with ❤️ using modern web technologies*
