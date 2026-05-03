# VoteX Frontend

Modern, accessible election education platform for Indian voters.

## 🚀 Quick Deploy to Netlify

### Option 1: Direct Dist Folder Deploy
1. Build the project:
   ```bash
   npm install
   npm run build
   ```
2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Your site is live! 🎉

### Option 2: Git-based Deploy
1. Push your code to GitHub
2. Connect your repo to Netlify
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy!

## 🏃 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- **Frontend-Only Mode**: Works completely standalone with dummy data
- **No Backend Required**: All pages work without API calls
- **Netlify Ready**: Includes `_redirects` for SPA routing
- **Responsive Design**: Mobile-first, accessible UI
- **PWA Support**: Service worker for offline functionality

## 📦 What's Included

- ✅ Landing Page with animated hero
- ✅ Interactive Timeline
- ✅ Knowledge Quiz (10 questions)
- ✅ Election Glossary (20 terms)
- ✅ Voting Guide (6 steps)
- ✅ Eligibility Checker
- ✅ About Page
- ✅ Auth Pages (Login/Register - UI only)

## 🔧 Configuration

The app works out of the box with dummy data. No environment variables needed!

If you want to connect to a backend API later:
1. Copy `.env.example` to `.env`
2. Set `VITE_API_BASE_URL=https://your-api.com/api`

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🎨 Tech Stack

- React 18
- React Router
- Vite
- Tailwind CSS
- Lucide Icons
- SWR (for future API integration)

## 📄 License

MIT License - See LICENSE file for details
