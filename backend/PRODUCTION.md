# Production checklist for deployment

## Pre-deployment Steps

### 1. Environment Variables
- [ ] Set `NODE_ENV=production`
- [ ] Generate a strong `JWT_SECRET` (use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
- [ ] Set production MongoDB URI (use MongoDB Atlas or similar)
- [ ] Configure production `FRONTEND_URL`
- [ ] Set up email configuration (SMTP settings)
- [ ] Change admin password to a strong, unique password

### 2. Security
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS to allow only your frontend domain
- [ ] Set up rate limiting
- [ ] Enable helmet middleware for security headers
- [ ] Implement request validation
- [ ] Set up proper authentication flow
- [ ] Enable MongoDB connection encryption

### 3. Database
- [ ] Set up MongoDB Atlas or production database
- [ ] Configure database backups
- [ ] Set up database monitoring
- [ ] Create indexes for better performance
- [ ] Test connection pooling

### 4. Error Handling
- [ ] Set up error logging service (e.g., Sentry)
- [ ] Configure production error messages
- [ ] Set up monitoring and alerts
- [ ] Implement proper error responses

### 5. Performance
- [ ] Enable response compression
- [ ] Set up caching strategy
- [ ] Optimize database queries
- [ ] Configure connection pooling
- [ ] Set up CDN for static assets

### 6. Deployment
- [ ] Build TypeScript to JavaScript (`npm run build`)
- [ ] Test production build locally
- [ ] Set up CI/CD pipeline
- [ ] Configure environment variables on hosting platform
- [ ] Set up health check endpoints
- [ ] Configure auto-scaling if needed

### 7. Monitoring
- [ ] Set up application monitoring (e.g., New Relic, DataDog)
- [ ] Configure logging service
- [ ] Set up uptime monitoring
- [ ] Create performance benchmarks

### 8. Documentation
- [ ] Document API endpoints
- [ ] Create deployment guide
- [ ] Document environment variables
- [ ] Add troubleshooting guide

## Deployment Platforms

### Option 1: Heroku
```bash
# Install Heroku CLI
heroku login
heroku create honoured-consult-api
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set MONGODB_URI=your-mongodb-uri
git push heroku main
```

### Option 2: DigitalOcean App Platform
1. Connect your GitHub repository
2. Configure environment variables in the dashboard
3. Set build command: `npm run build`
4. Set run command: `npm run start:prod`

### Option 3: AWS (EC2/Elastic Beanstalk)
1. Set up EC2 instance or Elastic Beanstalk
2. Install Node.js and MongoDB
3. Configure security groups
4. Set up environment variables
5. Deploy using PM2 for process management

### Option 4: Vercel/Netlify Functions
Convert to serverless functions if needed

### Option 5: Docker Deployment
```bash
docker build -t honoured-consult-backend .
docker run -p 5000:5000 --env-file .env honoured-consult-backend
```

## Post-deployment

- [ ] Test all API endpoints
- [ ] Verify database connections
- [ ] Check authentication flow
- [ ] Test admin functionality
- [ ] Monitor logs for errors
- [ ] Verify CORS settings
- [ ] Test from frontend application
- [ ] Run security audit
- [ ] Test under load
- [ ] Set up automated backups
