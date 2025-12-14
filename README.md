# ATS-Pro Resume Builder

A modern, ATS-optimized resume builder built with React, TypeScript, and Vite. Create professional resumes with customizable templates, section reordering, and AI-powered content enhancement.

🌐 **Live Demo**: [View on GitHub Pages](https://finbytes-algo.github.io/resumebuilder/)

## Features

- 📝 **Multiple Resume Templates**: Classic, Timeline, and Modern layouts
- 🎨 **Customizable Design**: Choose from preset colors or use custom colors
- 🔄 **Section Reordering**: Easily rearrange sections with up/down arrows
- ✨ **AI-Powered Content**: Enhance descriptions with Gemini AI
- 📄 **PDF Export**: Download your resume as a PDF
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Run Locally

**Prerequisites:** Node.js 18+ 

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   > Note: The Gemini API key is optional. The app will work without it, but AI features won't be available.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deploy to Vercel (Free)

Vercel is the easiest way to deploy this app. Follow these steps:

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name? (Press Enter for default)
   - Directory? (Press Enter for `./`)
   - Override settings? **No**

4. **Set Environment Variables** (if using Gemini AI):
   - Go to your project on [vercel.com](https://vercel.com)
   - Navigate to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key value
   - Redeploy if needed

5. **Your app is live!** 🎉

### Option 2: Deploy via GitHub + Vercel

1. **Create a GitHub repository**:
   ```bash
   git remote add origin https://github.com/yourusername/ats-pro-resume-builder.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Add environment variable `GEMINI_API_KEY` if needed
   - Click "Deploy"

3. **Your app is live!** 🎉

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Vercel will auto-detect the Vite framework
5. Add environment variables if needed
6. Click "Deploy"

## Environment Variables

- `GEMINI_API_KEY` (Optional): Your Google Gemini API key for AI features

## Project Structure

```
├── components/          # React components
│   ├── AIAssistant.tsx
│   ├── Button.tsx
│   ├── ResumeEditor.tsx
│   └── ResumePreview.tsx
├── services/           # API services
│   └── geminiService.ts
├── App.tsx           # Main app component
├── index.tsx         # Entry point
├── types.ts          # TypeScript types
└── vite.config.ts    # Vite configuration
```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Google Gemini AI** - AI content enhancement
- **html2pdf.js** - PDF generation

## License

MIT
