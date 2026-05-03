# 🚀 VoteX Complete Deployment Guide
## Backend on Render + Frontend on Vercel

---

## 📦 Part 1: Backend Deployment on Render

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Ready for deployment"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/votex.git
git branch -M main
git push -u origin main
```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 3: Create PostgreSQL Database

1. Click **New +** → **PostgreSQL**
2. Configure:
   - **Name**: `votex-db`
   - **Database**: `votex_db`
   - **User**: `votex_user`
   - **Region**: Choose closest (e.g., Singapore for India)
   - **Plan**: **Free**
3. Click **Create Database**
4. Wait 2-3 minutes for database to be ready
5. **Copy Internal Database URL** (you'll need this)

### Step 4: Create Web Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository `votex`
3. Configure:

   **Basic Settings:**
   - **Name**: `votex-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Runtime**: `Python 3`

   **Build & Deploy:**
   - **Build Command**: 
     ```bash
     pip install -r requirements.txt && python manage.py collectstatic --noinput
     ```
   - **Start Command**: 
     ```bash
     gunicorn backend.wsgi:application
     ```

   **Plan**: **Free**

4. Click **Advanced** → **Add Environment Variable**

### Step 5: Add Environment Variables

Add these one by one:

```bash
# Generate SECRET_KEY first (run locally):
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Then add in Render:

| Key | Value |
|-----|-------|
| `SECRET_KEY` | `<paste-generated-secret-key>` |
| `DEBUG` | `False` |
| `DJANGO_SETTINGS_MODULE` | `backend.settings_prod` |
| `ALLOWED_HOSTS` | `votex-backend.onrender.com` |
| `DATABASE_URL` | `<paste-internal-database-url-from-step-3>` |
| `CORS_ALLOWED_ORIGINS` | `https://votex.vercel.app` (update after frontend deploy) |

### Step 6: Deploy Backend

1. Click **Create Web Service**
2. Wait 5-10 minutes for deployment
3. Check logs for any errors
4. Your backend will be at: `https://votex-backend.onrender.com`

### Step 7: Run Database Migrations

1. Go to your web service dashboard
2. Click **Shell** tab (or use Render CLI)
3. Run these commands:

```bash
python manage.py migrate
python manage.py createsuperuser
# Follow prompts to create admin user

python manage.py seed_data
```

### Step 8: Test Backend

Visit these URLs in browser:

- `https://votex-backend.onrender.com/admin/` - Admin panel
- `https://votex-backend.onrender.com/api/faq/` - FAQ API
- `https://votex-backend.onrender.com/api/glossary/` - Glossary API

✅ **Backend deployment complete!**

---

## 🎨 Part 2: Frontend Deployment on Vercel

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel

### Step 2: Import Project

1. Click **Add New...** → **Project**
2. Import your `votex` repository
3. Configure:

   **Framework Preset**: `Vite`
   
   **Root Directory**: `frontend`
   
   **Build Settings:**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables

Click **Environment Variables** and add:

| Name | Value |
|------|-------|
| `VITE_API_BASE_URL` | `https://votex-backend.onrender.com/api` |

### Step 4: Deploy Frontend

1. Click **Deploy**
2. Wait 2-3 minutes
3. Your frontend will be at: `https://votex.vercel.app`

### Step 5: Update Backend CORS

1. Go back to Render dashboard
2. Open your `votex-backend` service
3. Go to **Environment** tab
4. Update `CORS_ALLOWED_ORIGINS`:
   ```
   https://votex.vercel.app,https://votex-backend.onrender.com
   ```
5. Save changes (service will auto-redeploy)

### Step 6: Test Complete Application

Visit `https://votex.vercel.app` and test:

- ✅ Landing page loads
- ✅ Navigation works
- ✅ Quiz page fetches questions
- ✅ Glossary page shows terms
- ✅ Login/Register works
- ✅ All API calls successful

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

**For Vercel (Frontend):**
1. Go to Project Settings → Domains
2. Add your domain (e.g., `votex.com`)
3. Update DNS records as instructed

**For Render (Backend):**
1. Go to Settings → Custom Domain
2. Add your API domain (e.g., `api.votex.com`)
3. Update DNS records

### Update CORS After Custom Domain

If you add custom domains, update `CORS_ALLOWED_ORIGINS` in Render:
```
https://votex.com,https://www.votex.com,https://api.votex.com
```

---

## 📊 Monitoring & Maintenance

### Render (Backend)

**View Logs:**
- Dashboard → Your Service → Logs tab

**Monitor Performance:**
- Dashboard → Your Service → Metrics tab

**Database Backups:**
- Dashboard → votex-db → Backups tab
- Enable automatic backups

### Vercel (Frontend)

**View Deployments:**
- Project → Deployments tab

**Analytics:**
- Project → Analytics (available on Pro plan)

**Logs:**
- Deployment → View Function Logs

---

## 🐛 Common Issues & Solutions

### Issue 1: Backend shows "Application Error"

**Solution:**
```bash
# Check logs in Render dashboard
# Common fixes:
1. Verify all environment variables are set
2. Check DATABASE_URL is correct
3. Run migrations: python manage.py migrate
4. Check SECRET_KEY is set
```

### Issue 2: Frontend can't connect to backend

**Solution:**
1. Check `VITE_API_BASE_URL` in Vercel environment variables
2. Verify CORS settings in Render
3. Ensure backend URL is correct (with `/api` at end)
4. Check browser console for CORS errors

### Issue 3: Static files not loading

**Solution:**
```bash
# In Render Shell:
python manage.py collectstatic --noinput
```

### Issue 4: Database connection error

**Solution:**
1. Check if database is running in Render
2. Verify `DATABASE_URL` environment variable
3. Check database connection limit (free tier: 97 connections)

### Issue 5: Render service sleeping (free tier)

**Note:** Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Upgrade to paid plan for always-on service
- Or use a service like UptimeRobot to ping every 14 minutes

---

## 🔄 Updating Your Application

### Update Backend

```bash
# Make changes locally
git add .
git commit -m "Update backend"
git push origin main

# Render will auto-deploy from GitHub
# Check deployment status in Render dashboard
```

### Update Frontend

```bash
# Make changes locally
git add .
git commit -m "Update frontend"
git push origin main

# Vercel will auto-deploy from GitHub
# Check deployment status in Vercel dashboard
```

### Update Environment Variables

**Render:**
1. Dashboard → Service → Environment
2. Update variable
3. Save (auto-redeploys)

**Vercel:**
1. Project → Settings → Environment Variables
2. Update variable
3. Redeploy from Deployments tab

---

## 📝 Deployment Checklist

### Before Deployment

- [ ] All code committed to GitHub
- [ ] `requirements.txt` is up to date
- [ ] `.env.example` files created
- [ ] `.gitignore` includes sensitive files
- [ ] Database migrations are ready
- [ ] Static files configured

### Backend (Render)

- [ ] PostgreSQL database created
- [ ] Web service created
- [ ] All environment variables set
- [ ] Build and start commands configured
- [ ] Migrations run successfully
- [ ] Superuser created
- [ ] Sample data seeded
- [ ] Admin panel accessible
- [ ] API endpoints working

### Frontend (Vercel)

- [ ] Project imported
- [ ] Root directory set to `frontend`
- [ ] Environment variables set
- [ ] Build successful
- [ ] Site accessible
- [ ] API calls working
- [ ] All pages loading
- [ ] Navigation working

### Final Steps

- [ ] CORS configured correctly
- [ ] Both sites tested together
- [ ] Custom domains configured (if applicable)
- [ ] SSL/HTTPS working
- [ ] Error monitoring set up
- [ ] Backups enabled

---

## 💰 Cost Breakdown

### Free Tier Limits

**Render (Free):**
- ✅ 750 hours/month web service
- ✅ PostgreSQL database (1GB storage)
- ⚠️ Services sleep after 15 min inactivity
- ⚠️ 97 database connections max

**Vercel (Free):**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL
- ✅ Global CDN

**Total Cost: $0/month** 🎉

### Upgrade Options

**Render Starter ($7/month):**
- Always-on service (no sleeping)
- More database connections

**Vercel Pro ($20/month):**
- More bandwidth
- Analytics
- Password protection

---

## 🎯 Performance Tips

1. **Enable Caching:**
   - Add Redis on Render for better performance
   - Use Vercel Edge Caching

2. **Optimize Images:**
   - Use WebP format
   - Compress images before upload

3. **Database Optimization:**
   - Add indexes to frequently queried fields
   - Use connection pooling

4. **Monitor Performance:**
   - Set up error tracking (Sentry)
   - Monitor API response times

---

## 📞 Support Resources

- **Render Docs:** [render.com/docs](https://render.com/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Django Deployment:** [docs.djangoproject.com/en/stable/howto/deployment/](https://docs.djangoproject.com/en/stable/howto/deployment/)
- **Vite Deployment:** [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy)

---

## 🎉 Congratulations!

Your VoteX application is now live! 🚀

**Backend:** `https://votex-backend.onrender.com`
**Frontend:** `https://votex.vercel.app`

Share your deployed app and help citizens understand the voting process! 🗳️✨

---

**Need Help?** Check the troubleshooting section or review platform-specific documentation.
