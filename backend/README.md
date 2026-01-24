# Honoured Consult - Backend API

Backend API server for the Honoured Consult study abroad consulting platform.

## Features

- RESTful API endpoints
- JWT-based authentication
- Email/password admin login
- Consultation management
- Notification system
- Search analytics
- Ready for MongoDB integration

## Tech Stack

- Node.js
- Express.js
- JWT for authentication
- In-memory storage (temporary, will migrate to MongoDB)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` and update the following:

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
