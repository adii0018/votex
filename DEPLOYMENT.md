# 🚀 VoteX Backend Deployment Guide

## 📋 Prerequisites

- Python 3.11+
- PostgreSQL database (for production)
- Git
- Account on deployment platform (Render, Railway, Heroku, etc.)

---

## 🔧 Deployment Options

### Option 1: Deploy on Render (Recommended - Free Tier Available)

#### Step 1: Prepare Your Code

```bash
# Make sure all files are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **PostgreSQL**
3. Fill in:
   - **Name**: `votex-db`
   - **Database**: `votex_db`
   - **User**: `votex_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free
4. Click **Create Database**
5. Copy the **Internal Database URL** (starts with `postgresql://`)

#### Step 3: Create Web Service on Render

1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Fill in:
   - **Name**: `votex-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `.` if needed)
   - **Runtime**: `Python 3`
   - **Build Command**: 
     ```bash
     pip install -r requirements.txt && python manage.py collectstatic --noinput
     ```
   - **Start Command**: 
     ```bash
     gunicorn backend.wsgi:application
     ```
   - **Plan**: Free

#### Step 4: Add Environment Variables

In Render dashboard, go to **Environment** tab and add:

```
SECRET_KEY=your-super-secret-key-here-generate-new-one
DEBUG=False
ALLOWED_HOSTS=votex-backend.onrender.com,localhost
DATABASE_URL=<paste-internal-database-url-from-step-2>
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
DJANGO_SETTINGS_MODULE=backend.settings_prod
```

**Generate SECRET_KEY:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

#### Step 5: Deploy

1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Your backend will be live at: `https://votex-backend.onrender.com`

#### Step 6: Run Migrations & Seed Data

After deployment, go to **Shell** tab in Render and run:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data
```

---

### Option 2: Deploy on Railway

#### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
railway login
```

#### Step 2: Initialize Project

```bash
railway init
railway add --database postgresql
```

#### Step 3: Set Environment Variables

```bash
railway variables set SECRET_KEY="your-secret-key"
railway variables set DEBUG="False"
railway variables set DJANGO_SETTINGS_MODULE="backend.settings_prod"
railway variables set ALLOWED_HOSTS="your-app.railway.app"
```

#### Step 4: Deploy

```bash
railway up
```

---

### Option 3: Deploy on Heroku

#### Step 1: Install Heroku CLI

Download from [heroku.com/cli](https://devcenter.heroku.com/articles/heroku-cli)

#### Step 2: Login and Create App

```bash
heroku login
heroku create votex-backend
```

#### Step 3: Add PostgreSQL

```bash
heroku addons:create heroku-postgresql:mini
```

#### Step 4: Set Environment Variables

```bash
heroku config:set SECRET_KEY="your-secret-key"
heroku config:set DEBUG="False"
heroku config:set DJANGO_SETTINGS_MODULE="backend.settings_prod"
heroku config:set ALLOWED_HOSTS="votex-backend.herokuapp.com"
```

#### Step 5: Deploy

```bash
git push heroku main
```

#### Step 6: Run Migrations

```bash
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
heroku run python manage.py seed_data
```

---

## 🔐 Security Checklist

Before deploying, ensure:

- [ ] `DEBUG = False` in production
- [ ] Strong `SECRET_KEY` generated
- [ ] `ALLOWED_HOSTS` configured correctly
- [ ] Database credentials secured
- [ ] CORS origins set to your frontend domain only
- [ ] SSL/HTTPS enabled
- [ ] Environment variables not committed to Git

---

## 🧪 Testing Deployment

After deployment, test these endpoints:

```bash
# Health check
curl https://your-backend-url.com/api/

# Get FAQs
curl https://your-backend-url.com/api/faq/

# Get Glossary
curl https://your-backend-url.com/api/glossary/

# Get Quiz Questions
curl https://your-backend-url.com/api/quiz/
```

---

## 📊 Monitoring

### Render
- View logs in **Logs** tab
- Monitor metrics in **Metrics** tab

### Railway
```bash
railway logs
```

### Heroku
```bash
heroku logs --tail
```

---

## 🐛 Troubleshooting

### Issue: Static files not loading

**Solution:**
```bash
python manage.py collectstatic --noinput
```

### Issue: Database connection error

**Solution:**
- Check `DATABASE_URL` environment variable
- Ensure database is running
- Verify connection string format

### Issue: CORS errors

**Solution:**
- Add frontend domain to `CORS_ALLOWED_ORIGINS`
- Ensure no trailing slashes in URLs

### Issue: 500 Internal Server Error

**Solution:**
- Check logs for detailed error
- Verify all environment variables are set
- Run migrations: `python manage.py migrate`

---

## 🔄 Updating Deployment

```bash
# Make changes
git add .
git commit -m "Update backend"
git push origin main

# Render/Railway will auto-deploy
# For Heroku:
git push heroku main
```

---

## 📝 Post-Deployment

1. **Create Admin User:**
   ```bash
   python manage.py createsuperuser
   ```

2. **Access Admin Panel:**
   - Visit: `https://your-backend-url.com/admin/`
   - Login with superuser credentials

3. **Seed Sample Data:**
   ```bash
   python manage.py seed_data
   ```

4. **Update Frontend:**
   - Update API base URL in `frontend/src/api.js`
   - Change from `http://localhost:8000` to your deployed backend URL

---

## 🎯 Next Steps

After backend deployment:
1. Deploy frontend (see FRONTEND_DEPLOYMENT.md)
2. Update CORS settings with frontend URL
3. Test all API endpoints
4. Monitor logs for errors
5. Set up custom domain (optional)

---

## 💡 Tips

- **Free Tier Limitations:**
  - Render: Spins down after 15 min inactivity
  - Railway: 500 hours/month free
  - Heroku: Requires credit card for free tier

- **Database Backups:**
  - Enable automatic backups on your platform
  - Export data regularly

- **Performance:**
  - Use caching (Redis) for better performance
  - Enable database connection pooling
  - Monitor query performance

---

## 📞 Support

If you encounter issues:
1. Check platform-specific documentation
2. Review error logs
3. Verify environment variables
4. Test locally with production settings

---

**Happy Deploying! 🚀**
