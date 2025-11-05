# Simple Admin Dashboard Workflow

## 🚀 Quick Start (Simpler Way!)

No more downloading and uploading JSON files! Here's the simpler workflow:

### 1. Start the Local Server

Open a terminal in your project directory and run:

```bash
node server.js
```

You'll see:
```
🚀 Admin Dashboard Server running on http://localhost:3001
📝 Updates will be saved to: website-data.json

💡 Keep this server running while using the admin dashboard
   Press Ctrl+C to stop
```

### 2. Use the Admin Dashboard

1. Open `admin.html` in your browser
2. Make any changes you want
3. Click **"Save All Changes"** button
4. ✅ **Done!** Your changes are automatically saved to `website-data.json`
5. Refresh your website (`index.html`) to see the changes!

### That's it! 🎉

No more manual file downloads and uploads. The server automatically updates `website-data.json` for you.

---

## 📋 How It Works

- **Local Server** (`server.js`): Listens for save requests from the admin panel
- **Admin Panel**: Sends data to the server when you click "Save All Changes"
- **Server**: Automatically writes data to `website-data.json`
- **Website**: Loads data from `website-data.json` automatically

---

## 🔄 Fallback Mode

If you don't run the server, the admin panel will still work:
- It will download `website-data.json` as before
- You can manually place it in your project root

But the server method is much simpler! ✨

---

## 💻 Requirements

- Node.js installed (check with `node --version`)
- That's it!

---

## 🛠️ Troubleshooting

**Server won't start?**
- Make sure Node.js is installed
- Check if port 3001 is already in use
- Try: `node --version` to verify Node.js

**Changes not appearing?**
- Make sure the server is running
- Check browser console for errors
- Refresh your website page

**Still using the old method?**
- That's fine! The fallback still works
- But try the server method - it's much easier! 😊

