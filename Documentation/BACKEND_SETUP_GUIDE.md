# 🌏 Mystic India Backend Setup Guide

This guide will help you set up the complete backend authentication system for Mystic India.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **MongoDB** (v4.4 or higher)
- **Redis** (v6.0 or higher)
- **Git** (for cloning the repository)

## 🚀 Quick Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Run Setup Script
```bash
node setup.js
```

This script will:
- Check Node.js version
- Create `.env` file from template
- Install dependencies
- Create necessary directories

### 3. Configure Environment Variables
Edit the `.env` file with your configuration:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/mystic-india
REDIS_URL=redis://localhost:6379

# JWT Secrets (CHANGE THESE!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 4. Start the Server
```bash
# Development
npm run dev

# Production
npm start
```

## 🔧 Detailed Configuration

### Database Setup

#### MongoDB
1. **Install MongoDB**
   ```bash
   # macOS with Homebrew
   brew install mongodb-community
   
   # Ubuntu/Debian
   sudo apt-get install mongodb
   
   # Windows
   # Download from https://www.mongodb.com/try/download/community
   ```

2. **Start MongoDB**
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Ubuntu/Debian
   sudo systemctl start mongod
   
   # Windows
   # Start MongoDB service
   ```

3. **Create Database**
   ```bash
   mongo
   use mystic-india
   ```

#### Redis
1. **Install Redis**
   ```bash
   # macOS with Homebrew
   brew install redis
   
   # Ubuntu/Debian
   sudo apt-get install redis-server
   
   # Windows
   # Download from https://github.com/microsoftarchive/redis/releases
   ```

2. **Start Redis**
   ```bash
   # macOS
   brew services start redis
   
   # Ubuntu/Debian
   sudo systemctl start redis-server
   
   # Windows
   # Start Redis service
   ```

### OAuth Configuration

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/v1/auth/google/callback`
   - `https://yourdomain.com/api/v1/auth/google/callback`

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL:
   - `http://localhost:5000/api/v1/auth/github/callback`
   - `https://yourdomain.com/api/v1/auth/github/callback`

### Email Configuration

#### Gmail SMTP
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in `EMAIL_PASSWORD`

#### SendGrid (Alternative)
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key
3. Set environment variables:
   ```env
   SENDGRID_API_KEY=your-sendgrid-api-key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```

## 🧪 Testing the Setup

### 1. Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "development",
  "version": "1.0.0"
}
```

### 2. Test Registration
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

### 3. Test Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

## 🔗 Frontend Integration

### 1. Update Frontend Environment
Create/update `.env` in the root directory:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 2. Update Frontend Auth Service
The new `authService.js` has been created in `src/lib/authService.js` and includes:
- Backend API integration
- Token management
- Error handling
- All authentication methods

### 3. Update Auth Context
Replace the old `src/lib/auth.ts` with the new `src/lib/authService.js`:
```javascript
// In src/context/AuthContext.tsx
import authService from '@/lib/authService';

// Update useAuthState hook to use new service
```

## 🚀 Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongo:27017/mystic-india
REDIS_URL=redis://redis:6379
JWT_SECRET=your-production-jwt-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
CORS_ORIGIN=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/mystic-india
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

volumes:
  mongo_data:
```

## 🛡️ Security Checklist

### Before Production
- [ ] Change default JWT secrets
- [ ] Use strong passwords for databases
- [ ] Enable HTTPS in production
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Use environment variables for secrets
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Test all security features

### Security Features Included
- ✅ Password hashing (bcrypt/Argon2)
- ✅ JWT token management
- ✅ Rate limiting
- ✅ Brute force protection
- ✅ Input validation
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Secure headers
- ✅ Session management

## 📊 Monitoring

### Health Endpoints
- `/health` - Basic health check
- `/health/detailed` - Detailed system status
- `/health/database` - Database connection status
- `/health/redis` - Redis connection status

### Logging
- Request/response logging
- Error logging with stack traces
- Security event logging
- Performance metrics

## 🆘 Troubleshooting

### Common Issues

#### MongoDB Connection Failed
```bash
# Check if MongoDB is running
brew services list | grep mongodb
sudo systemctl status mongod

# Check connection
mongo mongodb://localhost:27017/mystic-india
```

#### Redis Connection Failed
```bash
# Check if Redis is running
brew services list | grep redis
sudo systemctl status redis-server

# Check connection
redis-cli ping
```

#### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

#### OAuth Not Working
- Check redirect URIs in OAuth provider settings
- Verify client ID and secret
- Check CORS configuration
- Ensure HTTPS in production

### Debug Mode
Enable debug mode in `.env`:
```env
DEBUG=true
VERBOSE_LOGGING=true
```

## 📚 API Documentation

### Authentication Flow
1. **Register** → Email verification (optional)
2. **Login** → Access + Refresh tokens
3. **Refresh** → New access token
4. **Logout** → Invalidate tokens

### Token Management
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Automatic token refresh
- Secure cookie storage

### User Data
- Profile information
- Trip management
- Saved states
- Activity tracking
- Preferences

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Contact: deepanshu95488@gmail.com
- Check the main README.md for more information

---

**Mystic India Backend** - Secure, scalable authentication for cultural exploration.
