# Vercel Deployment - Updating Content

## 🚀 How to Update Your Website on Vercel

After making changes in the admin panel, follow these steps to deploy updates:

### Step 1: Save Changes in Admin Panel
1. Go to `/admin` on your Vercel site (or `admin.html` locally)
2. Make your changes
3. Click **"Save All Changes"**
4. This downloads `website-data.json` file

### Step 2: Update and Deploy
1. **Replace** the `website-data.json` file in your project root with the downloaded file
2. **Commit** to git:
   ```bash
   git add website-data.json
   git commit -m "Update website content"
   git push origin main
   ```
3. **Vercel will auto-deploy** - changes appear in 1-2 minutes!

### Step 3: Verify
- Visit your Vercel site
- Changes should appear immediately
- Share the link - others will see the same content!

## 💡 Why This Works

- **website-data.json** is the source of truth
- All visitors load from this file (not localStorage)
- Changes are consistent across all devices
- No server needed - pure static hosting!

## 🔄 Quick Update Workflow

```bash
# 1. Make changes in admin panel
# 2. Download website-data.json
# 3. Replace file and commit:
git add website-data.json
git commit -m "Update content"
git push
# 4. Done! Vercel auto-deploys
```

## ⚠️ Important Notes

- Always commit `website-data.json` after making changes
- The file must be in the project root directory
- Changes appear for everyone after deployment
- localStorage is only used for local development

