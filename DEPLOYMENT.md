# Deployment Guide - ATS-Pro Resume Builder

## Quick Deploy to Vercel (Free Tier)

### Method 1: Deploy via GitHub (Easiest - Recommended)

1. **Create a GitHub repository:**
   ```bash
   # If you haven't already, initialize git and commit
   git add .
   git commit -m "Ready for deployment"
   
   # Create a new repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Select your repository
   - Vercel will auto-detect Vite settings ✅
   - Click "Deploy"
   - Wait ~2 minutes for deployment

3. **Add Environment Variables (Optional - for AI features):**
   - Go to your project → Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = `your_api_key_here`
   - Redeploy if needed

4. **Done!** Your app is live at `https://your-project.vercel.app` 🎉

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Answer the prompts:
   - Set up and deploy? → **Yes**
   - Which scope? → Select your account
   - Link to existing project? → **No**
   - Project name? → Press Enter (or type custom name)
   - Directory? → Press Enter (uses current directory)
   - Override settings? → **No**

4. **Add Environment Variables (if needed):**
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   Enter your API key when prompted.

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Method 3: Deploy via Vercel Dashboard (No CLI)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Connect your Git provider (GitHub/GitLab/Bitbucket)
4. Import your repository
5. Vercel auto-detects Vite - no configuration needed!
6. Add environment variables if needed
7. Click "Deploy"

## Alternative: Deploy to Netlify (Also Free)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Drag and drop the `dist` folder, OR
   - Connect your GitHub repo and set:
     - Build command: `npm run build`
     - Publish directory: `dist`

## Alternative: Deploy to Firebase Hosting (Free)

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login:**
   ```bash
   firebase login
   ```

3. **Initialize:**
   ```bash
   firebase init hosting
   ```
   - Select existing project or create new
   - Public directory: `dist`
   - Single-page app: **Yes**
   - Auto-build: **No** (or Yes if using GitHub)

4. **Build and Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

## Troubleshooting

### Build Fails
- Make sure all dependencies are in `package.json`
- Check Node.js version (needs 18+)
- Run `npm install` before deploying

### Environment Variables Not Working
- Make sure they're set in Vercel dashboard
- Redeploy after adding env vars
- Check variable names match exactly

### PDF Download Not Working
- Make sure `html2pdf.js` CDN is loaded (check `index.html`)
- Test in production build, not just dev

## Free Tier Limits

**Vercel:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Perfect for this project!

**Netlify:**
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Perfect for this project!

**Firebase Hosting:**
- ✅ 10GB storage
- ✅ 360MB/day transfer
- ✅ Perfect for this project!

All three platforms are free and perfect for this resume builder app!

