# ⚡ Quick Deployment Reference

## 🎯 Backend on Render

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Render Setup
1. Create PostgreSQL database → Copy Internal URL
2. Create Web Service → Connect GitHub repo
3. Build: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
4. Start: `gunicorn backend.wsgi:application`

### 3. Environment Variables
```
SECRET_KEY=<generate-new-one>
DEBUG=False
DJANGO_SETTINGS_MODULE=backend.settings_prod
ALLOWED_HOSTS=votex-backend.onrender.com
DATABASE_URL=<paste-database-url>
CORS_ALLOWED_ORIGINS=https://votex.vercel.app
```

### 4. After Deploy - Run in Shell
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data
```

**Backend URL:** `https://votex-backend.onrender.com`

---

## 🎨 Frontend on Vercel

### 1. Vercel Setup
1. Import GitHub repo
2. Root Directory: `frontend`
3. Framework: Vite
4. Build: `npm run build`
5. Output: `dist`

### 2. Environment Variable
```
VITE_API_BASE_URL=https://votex-backend.onrender.com/api
```

### 3. Deploy
Click Deploy → Wait 2-3 minutes

**Frontend URL:** `https://votex.vercel.app`

---

## ✅ Final Step

Update CORS in Render:
```
CORS_ALLOWED_ORIGINS=https://votex.vercel.app
```

---

## 🧪 Test URLs

- Frontend: `https://votex.vercel.app`
- Backend API: `https://votex-backend.onrender.com/api/faq/`
- Admin: `https://votex-backend.onrender.com/admin/`

---

## 🔧 Generate SECRET_KEY

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

**Done! 🚀**
