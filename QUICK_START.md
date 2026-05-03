# 🚀 VoteX - Quick Start Guide

## Abhi Shuru Karein! (Start Now!)

### ⚡ 5-Minute Setup

#### 1️⃣ Backend Start Karein
```bash
# Terminal 1 mein
python manage.py runserver
```

✅ Backend running at: http://localhost:8000

#### 2️⃣ Frontend Start Karein
```bash
# Terminal 2 mein
cd frontend
npm run dev
```

✅ Frontend running at: http://localhost:5173

---

## 🎯 New Features Test Karein

### 1. User Registration
1. Browser mein jao: http://localhost:5173/register
2. Form fill karein:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test@123`
   - Confirm Password: `Test@123`
3. Click "Register"
4. ✅ Account ban gaya!
5. Terminal mein welcome email dekho

### 2. Login
1. Jao: http://localhost:5173/login
2. Credentials enter karein
3. Click "Login"
4. ✅ Logged in!

### 3. Profile Check
1. Navbar mein apna username dikhai dega
2. Click karein username pe
3. Profile page khulega with:
   - ✅ Your information
   - ✅ Quiz statistics
   - ✅ Notifications
4. "Edit" button se profile update karein

### 4. Quiz Attempt
1. Jao: http://localhost:5173/quiz
2. Quiz complete karein
3. 80%+ score karein
4. ✅ Notification milega!
5. Profile mein stats update honge

### 5. Language Change
1. Navbar mein globe icon (🌐) dekho
2. Click karein
3. "हिंदी" select karein
4. ✅ UI Hindi mein change ho jayega!

### 6. PWA Test
1. Chrome/Edge browser use karein
2. Address bar mein install icon (⊕) dekho
3. Click "Install"
4. ✅ App install ho jayega!
5. Desktop pe shortcut ban jayega

### 7. Offline Mode
1. DevTools open karein (F12)
2. Network tab mein jao
3. "Offline" checkbox check karein
4. Page refresh karein
5. ✅ App still works!

---

## 🎨 Admin Panel Access

### Superuser Banao
```bash
python manage.py createsuperuser
```

Enter details:
- Username: `admin`
- Email: `admin@votex.com`
- Password: `admin123`

### Admin Panel Kholo
1. Jao: http://localhost:8000/admin
2. Login with superuser credentials
3. ✅ Admin panel access!

### Admin Features:
- **User Profiles** - All users dekho
- **Quiz Attempts** - Sabke scores dekho
- **Notifications** - New notifications create karein
- **Bookmarks** - User bookmarks manage karein
- **FAQs, Glossary, etc.** - Content manage karein

---

## 📱 Mobile Testing

### Android/iOS:
1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Update `frontend/src/contexts/AuthContext.jsx`:
   ```javascript
   // Replace localhost with your IP
   const API_URL = 'http://192.168.1.100:8000/api/';
   ```

3. Update Django `backend/settings.py`:
   ```python
   ALLOWED_HOSTS = ['localhost', '127.0.0.1', '192.168.1.100']
   
   CORS_ALLOWED_ORIGINS = [
       'http://localhost:5173',
       'http://192.168.1.100:5173',
   ]
   ```

4. Mobile browser mein jao: `http://192.168.1.100:5173`
5. ✅ Mobile pe test karein!

---

## 🔧 Common Commands

### Backend:
```bash
# Migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Seed sample data
python manage.py seed_data

# Run server
python manage.py runserver

# Django shell
python manage.py shell
```

### Frontend:
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 🐛 Troubleshooting

### Issue: Backend not starting
```bash
# Check if port 8000 is free
netstat -ano | findstr :8000

# Kill process if needed
taskkill /PID <process_id> /F
```

### Issue: Frontend not starting
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database errors
```bash
# Reset database
rm db.sqlite3
python manage.py migrate
python manage.py seed_data
```

### Issue: Service Worker not working
- Make sure you're on localhost or HTTPS
- Clear browser cache
- Check DevTools > Application > Service Workers

### Issue: Translations not showing
- Check LanguageProvider wraps App in App.jsx
- Clear localStorage
- Refresh page

---

## 📊 API Testing

### Using Browser:
1. Install JSON Formatter extension
2. Visit: http://localhost:8000/api/faq/
3. ✅ See JSON response

### Using Postman/Thunder Client:

#### Register User:
```
POST http://localhost:8000/api/auth/register/
Content-Type: application/json

{
  "username": "newuser",
  "email": "new@example.com",
  "password": "Pass@123",
  "password2": "Pass@123",
  "first_name": "New",
  "last_name": "User"
}
```

#### Login:
```
POST http://localhost:8000/api/auth/login/
Content-Type: application/json

{
  "username": "newuser",
  "password": "Pass@123"
}
```

#### Get Profile (with token):
```
GET http://localhost:8000/api/auth/profile/
Authorization: Token <your-token-here>
```

---

## 🎯 Feature Checklist

Test all features:

### Authentication:
- [ ] Register new user
- [ ] Login
- [ ] View profile
- [ ] Edit profile
- [ ] Change password
- [ ] Logout
- [ ] Check welcome email in console

### Quiz:
- [ ] Take quiz
- [ ] Submit answers
- [ ] See score
- [ ] Check notification (if 80%+)
- [ ] View quiz history in profile

### Bookmarks:
- [ ] Bookmark an FAQ
- [ ] Bookmark a glossary term
- [ ] View bookmarks in profile
- [ ] Remove bookmark

### Notifications:
- [ ] See notifications in profile
- [ ] Mark as read
- [ ] Mark all as read
- [ ] Check unread count

### Language:
- [ ] Switch to Hindi
- [ ] UI changes to Hindi
- [ ] Refresh - language persists
- [ ] Switch back to English

### PWA:
- [ ] Service worker registers
- [ ] Install prompt appears
- [ ] Install app
- [ ] Test offline mode
- [ ] App icon on desktop

---

## 💡 Pro Tips

### Development:
1. Keep both terminals open (backend + frontend)
2. Use browser DevTools for debugging
3. Check console for errors
4. Use React DevTools extension
5. Use Django Debug Toolbar (optional)

### Testing:
1. Test in incognito mode for fresh state
2. Clear localStorage if needed: `localStorage.clear()`
3. Check Network tab for API calls
4. Use different browsers
5. Test on mobile devices

### Debugging:
1. Backend errors: Check terminal output
2. Frontend errors: Check browser console
3. API errors: Check Network tab
4. Database issues: Check migrations
5. Auth issues: Check token in localStorage

---

## 📚 Learn More

### Documentation:
- `FEATURES_ADDED.md` - Detailed feature docs
- `IMPLEMENTATION_SUMMARY.md` - Technical summary
- `README.md` - Project overview

### Code Structure:
```
Backend:
- api/models.py - Database models
- api/views.py - API logic
- api/serializers.py - Data serialization
- api/urls.py - URL routing

Frontend:
- src/contexts/ - Global state
- src/pages/ - Page components
- src/components/ - Reusable components
- src/api.js - API client
```

---

## 🎊 Success!

Agar sab kuch kaam kar raha hai, toh:

✅ Backend running
✅ Frontend running
✅ User registration working
✅ Login working
✅ Profile page showing
✅ Quiz tracking working
✅ Notifications working
✅ Language switching working
✅ PWA features working

**Congratulations! Aapka VoteX project fully functional hai! 🚀**

---

## 🆘 Need Help?

1. Check error messages carefully
2. Review documentation files
3. Check browser console
4. Verify both servers are running
5. Try restarting servers
6. Clear cache and try again

---

## 🎯 Next Steps

1. ✅ Test all features
2. ✅ Customize UI/content
3. ✅ Add more data via admin panel
4. ✅ Test on mobile devices
5. ✅ Share with friends
6. ✅ Deploy to production

**Happy Coding! 🎉**
