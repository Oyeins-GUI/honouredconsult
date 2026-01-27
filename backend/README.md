# Honoured Consult Backend API

Production-ready backend API for the Honoured Consult study abroad consultation platform.

## Features

- ✅ User Authentication (JWT-based)
- ✅ Admin Dashboard
- ✅ Consultation Management
- ✅ Course & University Management
- ✅ Application Tracking
- ✅ Search Analytics
- ✅ Blog Management
- ✅ Notification System
- ✅ TypeScript Support
- ✅ MongoDB Integration
- ✅ RESTful API Design

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Build for Production

```bash
npm run build
npm start
```

- `ADMIN_EMAIL`: Admin email (default: info@honouredconsult.com)
- `ADMIN_PASSWORD`: Admin password
- `JWT_SECRET`: Secret key for JWT tokens

### Running the Server

Development mode with auto-reload:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - Logout

### Consultations

- `POST /api/consultations` - Submit consultation request
- `GET /api/consultations` - Get all consultations (admin only)
- `GET /api/consultations/:id` - Get single consultation (admin only)
- `PATCH /api/consultations/:id` - Update consultation status (admin only)
- `DELETE /api/consultations/:id` - Delete consultation (admin only)

### Notifications

- `GET /api/notifications/settings` - Get notification settings (admin only)
- `PUT /api/notifications/settings` - Update notification settings (admin only)
- `POST /api/notifications` - Create notification
- `GET /api/notifications/history` - Get notification history (admin only)
- `DELETE /api/notifications/:id` - Delete notification (admin only)

### Searches

- `POST /api/searches` - Record search query
- `GET /api/searches` - Get all searches (admin only)
- `GET /api/searches/analytics` - Get search analytics (admin only)

### Health Check

- `GET /api/health` - Server health check

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Login with admin credentials:

```bash
POST /api/auth/login
{
  "email": "info@honouredconsult.com",
  "password": "your-password"
}
```

2. Use the returned token in subsequent requests:

```bash
Authorization: Bearer <your-token>
```

## Default Admin Credentials

- Email: `info@honouredconsult.com`
- Password: `admin123` (change this in production!)

## Future Enhancements

- [ ] MongoDB integration
- [ ] Email notifications via Nodemailer
- [ ] File upload for documents
- [ ] Advanced analytics
- [ ] Rate limiting
- [ ] API documentation with Swagger
- [ ] Unit and integration tests

## Security Notes

⚠️ **Important**: Before deploying to production:

1. Change the default admin password
2. Use a strong JWT secret
3. Enable HTTPS
4. Implement rate limiting
5. Add input sanitization
6. Set up proper CORS policies

## License

MIT
