# Vercel Deployment Guide

## Overview

This guide explains how to deploy your portfolio website with the admin dashboard CMS to Vercel.

## Important: Python Script Won't Work on Vercel

The `sync-website.py` script is **only for local development**. It won't run on Vercel because:
- Vercel doesn't execute arbitrary Python scripts during deployment
- Static sites don't have build-time script execution for Python

## Solution: Dynamic JSON Loading

Instead of using the Python script, the website now:
1. **Loads content dynamically** from `website-data.json`
2. **Updates in real-time** when the JSON file is updated
3. **Works perfectly with Vercel** static hosting

## How It Works

### 1. Data Storage
- Website content is stored in `website-data.json` (in the `public` folder)
- Admin dashboard edits this data
- Website loads from this JSON file dynamically

### 2. Admin Dashboard
- Edit content in `admin.html`
- Click "Save All Changes"
- Downloads `website-data.json` file
- Upload the file to your project root

### 3. Website Loading
- `index.html` includes `website-loader.js`
- Script fetches `website-data.json` on page load
- Dynamically updates all content

## Deployment Steps

### Step 1: Prepare Your Project

1. **Ensure all files are in place:**
   ```
   efransia-resume/
   ├── index.html
   ├── admin.html
   ├── website-data.json (export from admin dashboard)
   ├── assets/
   │   ├── css/
   │   ├── js/
   │   │   ├── script.js
   │   │   ├── admin.js
   │   │   └── website-loader.js (NEW)
   │   └── images/
   ├── api/
   │   └── update-website.js (optional, for future API)
   └── send_email.php
   ```

### Step 2: Export Initial Data

1. Open `admin.html` in your browser
2. Make any edits you want
3. Click "Save All Changes"
4. This downloads `website-data.json`
5. Place `website-data.json` in your project root

### Step 3: Deploy to Vercel

#### Option A: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository (or drag & drop)
4. Vercel will auto-detect settings
5. Click "Deploy"

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# For production
vercel --prod
```

### Step 4: Update Content After Deployment

**Method 1: Manual Upload (Recommended for now)**

1. Open `admin.html` (you can host this on Vercel too)
2. Make changes
3. Click "Save All Changes"
4. Download `website-data.json`
5. Upload to your project root via:
   - Git commit and push
   - Vercel dashboard file upload
   - FTP/SSH

**Method 2: Git Workflow (Recommended)**

1. Make changes in admin dashboard locally
2. Export `website-data.json`
3. Commit and push to Git:
   ```bash
   git add website-data.json
   git commit -m "Update website content"
   git push
   ```
4. Vercel auto-deploys on push

## File Structure for Vercel

```
project-root/
├── index.html              # Main website
├── admin.html              # Admin dashboard
├── website-data.json       # Website content (must be in root)
├── vercel.json             # Vercel config (optional)
├── public/                 # Static assets (if using public folder)
│   └── website-data.json  # Alternative location
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── api/                    # Serverless functions (optional)
    └── update-website.js
```

## Vercel Configuration (Optional)

Create `vercel.json` for custom settings:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/admin.html",
      "dest": "/admin.html"
    },
    {
      "src": "/website-data.json",
      "dest": "/website-data.json"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## Important Notes

### ✅ What Works on Vercel:
- Static HTML/CSS/JS files
- JSON file serving
- Dynamic content loading from JSON
- Admin dashboard (as static HTML)
- Client-side JavaScript
- Serverless functions (API routes)

### ❌ What Doesn't Work on Vercel:
- Python build scripts (`sync-website.py`)
- Server-side file writing (without serverless functions)
- PHP files (unless using Vercel PHP runtime)

### 🔧 PHP Contact Form:
If you're using `send_email.php`, you have two options:

1. **Use a serverless function** (recommended):
   - Convert `send_email.php` to a Node.js serverless function
   - Place in `/api/send-email.js`

2. **Use a third-party service**:
   - Formspree
   - EmailJS
   - Netlify Forms

## Troubleshooting

### Website not loading content?
- Check that `website-data.json` exists in root
- Verify JSON syntax is valid
- Check browser console for errors
- Ensure `website-loader.js` is included in `index.html`

### Admin dashboard not saving?
- Check browser console for errors
- Verify localStorage is enabled
- Try exporting data manually

### Changes not appearing?
- Clear browser cache
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Check that `website-data.json` is updated
- Verify file is in the correct location

## Future Enhancements

For a more robust solution, consider:

1. **Vercel Blob Storage**: Store JSON in Vercel Blob
2. **Vercel KV**: Use Redis for data storage
3. **Headless CMS**: Integrate with Sanity, Contentful, etc.
4. **Database**: Use Supabase, MongoDB Atlas, etc.
5. **API Routes**: Create serverless functions for CRUD operations

## Summary

✅ **For Vercel deployment:**
- Use `website-loader.js` to load content dynamically
- Store data in `website-data.json`
- Admin dashboard exports JSON file
- Upload JSON file to project
- No Python script needed!

The website will work perfectly on Vercel with dynamic content loading. 🚀

