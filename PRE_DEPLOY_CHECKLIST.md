# ✅ Pre-Deployment Checklist

## 📋 Before You Deploy

### Code Preparation
- [ ] All changes committed to Git
- [ ] Code pushed to GitHub (main branch)
- [ ] No sensitive data in code (passwords, API keys)
- [ ] `.gitignore` properly configured
- [ ] `requirements.txt` is complete and up-to-date

### Backend Files Check
- [ ] `requirements.txt` exists
- [ ] `Procfile` exists
- [ ] `runtime.txt` exists
- [ ] `render.yaml` exists
- [ ] `backend/settings_prod.py` exists
- [ ] `.env.example` exists (but NOT `.env`)

### Frontend Files Check
- [ ] `frontend/vercel.json` exists
- [ ] `frontend/.env.example` exists (but NOT `.env`)
- [ ] `frontend/src/api.js` uses `import.meta.env.VITE_API_BASE_URL`
- [ ] `frontend/package.json` has all dependencies

### Security Check
- [ ] `DEBUG = False` in production settings
- [ ] Strong `SECRET_KEY` will be generated
- [ ] Database credentials not in code
- [ ] CORS properly configured
- [ ] HTTPS will be enabled

---

## 🔑 Information You'll Need

### For Render (Backend)
1. **GitHub Account** - To connect repository
2. **SECRET_KEY** - Generate using:
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
3. **Database URL** - Will be provided by Render
4. **Admin Credentials** - Choose username/password for superuser

### For Vercel (Frontend)
1. **GitHub Account** - To connect repository
2. **Backend URL** - Will get from Render after backend deployment

---

## 📝 Deployment Order

**IMPORTANT:** Deploy in this order!

1. ✅ **Backend First** (Render)
   - Get backend URL
   - Test API endpoints

2. ✅ **Frontend Second** (Vercel)
   - Use backend URL in environment variable
   - Update CORS in backend

---

## 🧪 Local Testing Before Deploy

### Test Backend
```bash
# Set environment variable
export DJANGO_SETTINGS_MODULE=backend.settings_prod
export DEBUG=False

# Test
python manage.py check --deploy
python manage.py collectstatic --noinput
```

### Test Frontend Build
```bash
cd frontend
npm run build
npm run preview
```

---

## 📊 Expected Results

### After Backend Deployment
- [ ] Service shows "Live" status in Render
- [ ] No errors in logs
- [ ] Admin panel accessible
- [ ] API endpoints return data
- [ ] Database migrations successful

### After Frontend Deployment
- [ ] Build successful in Vercel
- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] API calls working
- [ ] No CORS errors in console

---

## 🚨 Common Pre-Deploy Issues

### Issue: Missing dependencies
**Fix:** Run `pip freeze > requirements.txt`

### Issue: Build fails locally
**Fix:** Test build before deploying:
```bash
pip install -r requirements.txt
python manage.py collectstatic --noinput
```

### Issue: Frontend build fails
**Fix:** 
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 💡 Pro Tips

1. **Test Locally First**
   - Always test production settings locally
   - Use `python manage.py check --deploy`

2. **Keep Secrets Secret**
   - Never commit `.env` files
   - Use environment variables on platforms

3. **Monitor Deployments**
   - Watch logs during first deployment
   - Test all features after deployment

4. **Have Rollback Plan**
   - Keep previous working commit
   - Know how to redeploy previous version

---

## 🎯 Ready to Deploy?

If all checkboxes are ✅, you're ready!

Follow: `DEPLOYMENT_GUIDE.md` for detailed steps
Or use: `QUICK_DEPLOY.md` for quick reference

**Good luck! 🚀**
