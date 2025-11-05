# Admin Dashboard CMS - User Guide

## Overview

The Admin Dashboard CMS allows you to manage all aspects of your portfolio website from a single, user-friendly interface. You can edit personal information, services, portfolio items, resume sections, and more without touching any code.

## Accessing the Admin Dashboard

1. Open `admin.html` in your web browser
2. The dashboard will load with all current website data

## Features

### 1. Personal Information
- **Name**: Your full name displayed in the sidebar
- **Title/Job**: Your professional title
- **Profile Image**: URL to your profile picture
- **Contact Info**: Email, phone, and location
- **Social Links**: Add/remove social media links (Instagram, Facebook, Twitter, etc.)

### 2. About Section
- Edit the two paragraphs of your "About me" section
- Changes are saved automatically

### 3. Services
- **Add Service**: Click "Add Service" to create a new service
- **Edit Service**: 
  - Icon Class: Font Awesome icon class (e.g., `fas fa-palette`)
  - Title: Service name
  - Description: Service description
- **Delete Service**: Click the trash icon to remove a service

### 4. Clients
- **Add Client Logo**: Add new client logos
- **Edit Client**: 
  - Image URL: Path to the logo image
  - Alt Text: Alternative text for the image
- **Delete Client**: Remove client logos

### 5. Resume Section

#### Experience
- **Add Experience**: Add new work experience entries
- **Edit Experience**:
  - Title: Job title
  - Period: Time period (e.g., "2020 — Present")
  - Description: Main description
  - Details: Bullet points (one per line)
- **Delete Experience**: Remove experience entries

#### Education
- **Add Education**: Add new education entries
- **Edit Education**:
  - Title: School/Institution name
  - Period: Time period
  - Description: Degree/certification details
- **Delete Education**: Remove education entries

#### Skills
- **Add Skill**: Add new skills
- **Edit Skill**:
  - Skill Name: Name of the skill
  - Percentage: Skill level (0-100)
- **Delete Skill**: Remove skills

### 6. Portfolio
- **Categories**: Manage portfolio categories (All, Logos, Posters, Social, Others)
  - Add new categories
  - Remove categories (items will be moved to "Others")
- **Portfolio Items**:
  - **Add Portfolio Item**: Add new portfolio pieces
  - **Edit Portfolio Item**:
    - Title: Project name
    - Category: Select from available categories
    - Image URL: Path to portfolio image
  - **Delete Portfolio Item**: Remove portfolio pieces

### 7. Contact
- **Map Embed URL**: Google Maps embed URL
- **Contact Email**: Email address for form submissions

### 8. Settings
- **Site Title**: Website title (shown in browser tab)
- **Favicon Path**: Path to favicon image
- **Enable Contact Form**: Toggle contact form on/off

## Saving Changes

### Method 1: Auto-Save
- Most fields auto-save as you type
- Data is stored in browser localStorage

### Method 2: Save All
- Click "Save All Changes" button in the header
- This will:
  1. Save all changes to localStorage
  2. Export data to `website-data.json` file

## Syncing Changes to Website

After making changes in the admin dashboard:

1. **Export Data**: 
   - Click "Save All Changes" (automatically exports)
   - Or click "Export Data" in Settings
   - This downloads `website-data.json`

2. **Sync with Website**:

   **For Local Development:**
   - Place `website-data.json` in the project root directory
   - Run the sync script:
     ```bash
     python3 sync-website.py
     ```
   - This will update `index.html` with all your changes

   **For Vercel Deployment (Recommended):**
   - Place `website-data.json` in the project root directory
   - The website automatically loads from this file
   - No Python script needed! Just upload the JSON file
   - See `VERCEL-DEPLOYMENT.md` for details

## Import/Export Data

### Export Data
- Click "Export Data" in Settings
- Downloads a JSON file with all website data
- Useful for backups or transferring to another site

### Import Data
- Click "Import Data" in Settings
- Select a JSON file exported from the dashboard
- All data will be replaced with imported data

## Preview Site

Click the "Preview Site" button in the header to open your website in a new tab and see how it looks.

## Tips

1. **Image Paths**: Always use relative paths starting with `./assets/images/`
2. **Font Awesome Icons**: Use the format `fas fa-icon-name` (e.g., `fas fa-palette`)
3. **Categories**: Portfolio categories are case-sensitive
4. **Backup**: Regularly export your data as a backup
5. **Test Changes**: Always preview your site after making changes

## Troubleshooting

### Changes not appearing?
- Make sure you clicked "Save All Changes"
- Check that `website-data.json` was created
- Run the sync script: `python3 sync-website.py`
- Clear browser cache and refresh

### Images not loading?
- Verify image paths are correct
- Ensure images exist in the specified directory
- Use relative paths starting with `./`

### Data lost?
- Check browser localStorage (should persist)
- Use exported JSON file to restore
- Import the JSON file if needed

## Technical Details

- **Storage**: Data is stored in browser localStorage
- **Export Format**: JSON
- **Sync Script**: Python script that updates HTML files
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Support

For issues or questions:
1. Check this README
2. Verify all file paths are correct
3. Check browser console for errors
4. Ensure Python is installed for sync script

---

**Note**: The admin dashboard is a client-side application. For production use, consider adding authentication and a backend API for more secure data management.

