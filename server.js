#!/usr/bin/env node
/**
 * Simple Local Server for Admin Dashboard
 * Automatically updates website-data.json when admin saves changes
 * Also handles image uploads
 * 
 * Usage: node server.js
 * Then open admin.html and make changes - they'll auto-save!
 * Access admin at: http://localhost:3001/admin
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3001;
const JSON_FILE = path.join(__dirname, 'website-data.json');
const IMAGES_DIR = path.join(__dirname, 'assets', 'images');
const ADMIN_DIR = path.join(__dirname, 'admin');

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Serve static files
function serveStaticFile(filePath, res, contentType) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, corsHeaders);
    res.end(JSON.stringify({ error: 'File not found' }));
    return;
  }
  
  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 
    'Content-Type': contentType,
    ...corsHeaders 
  });
  res.end(content);
}

// Enable CORS for local development
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

const corsHeadersFile = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

// Parse multipart form data
function parseMultipartFormData(body, boundary) {
  const parts = body.split(`--${boundary}`);
  const formData = {};
  
  for (const part of parts) {
    if (!part || part === '--' || part.trim() === '') continue;
    
    const headerEnd = part.indexOf('\r\n\r\n');
    if (headerEnd === -1) continue;
    
    const headers = part.substring(0, headerEnd);
    const content = part.substring(headerEnd + 4);
    
    // Extract field name from Content-Disposition header
    const nameMatch = headers.match(/name="([^"]+)"/);
    if (nameMatch) {
      const fieldName = nameMatch[1];
      formData[fieldName] = content.trim();
    }
  }
  
  return formData;
}

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  
  // Serve admin page at /admin
  if (req.method === 'GET' && (url.pathname === '/admin' || url.pathname === '/admin/')) {
    const adminPath = path.join(ADMIN_DIR, 'index.html');
    if (fs.existsSync(adminPath)) {
      const content = fs.readFileSync(adminPath);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
      return;
    }
  }

  // Serve static assets (CSS, JS) from admin directory
  if (req.method === 'GET' && url.pathname.startsWith('/admin/assets/')) {
    const assetPath = path.join(__dirname, url.pathname.replace('/admin', ''));
    const ext = path.extname(assetPath);
    const contentType = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    }[ext] || 'application/octet-stream';
    
    if (fs.existsSync(assetPath)) {
      const content = fs.readFileSync(assetPath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
      return;
    }
  }

  // Serve other static assets (root level)
  if (req.method === 'GET' && url.pathname.startsWith('/assets/')) {
    const assetPath = path.join(__dirname, url.pathname);
    const ext = path.extname(assetPath);
    const contentType = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    }[ext] || 'application/octet-stream';
    
    if (fs.existsSync(assetPath)) {
      const content = fs.readFileSync(assetPath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
      return;
    }
  }

  // Serve website-data.json
  if (req.method === 'GET' && url.pathname === '/website-data.json') {
    if (fs.existsSync(JSON_FILE)) {
      const content = fs.readFileSync(JSON_FILE);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(content);
      return;
    }
  }
  
  // Handle image upload
  if (req.method === 'POST' && url.pathname === '/api/upload-image') {
    let body = Buffer.alloc(0);
    
    req.on('data', chunk => {
      body = Buffer.concat([body, chunk]);
    });
    
    req.on('end', () => {
      try {
        const contentType = req.headers['content-type'] || '';
        const boundaryMatch = contentType.match(/boundary=(.+)/);
        
        if (!boundaryMatch) {
          res.writeHead(400, corsHeadersFile);
          res.end(JSON.stringify({ error: 'Invalid content type' }));
          return;
        }
        
        const boundary = `--${boundaryMatch[1]}`;
        const parts = body.toString('binary').split(boundary);
        let imageBuffer = null;
        let filename = null;
        
        for (const part of parts) {
          if (!part || part.trim() === '' || part === '--') continue;
          
          const headerEnd = part.indexOf('\r\n\r\n');
          if (headerEnd === -1) continue;
          
          const headers = part.substring(0, headerEnd);
          const content = part.substring(headerEnd + 4);
          
          if (headers.includes('Content-Disposition')) {
            const nameMatch = headers.match(/name="([^"]+)"/);
            const filenameMatch = headers.match(/filename="([^"]+)"/);
            
            if (filenameMatch) {
              filename = filenameMatch[1];
            }
            if (nameMatch && nameMatch[1] === 'image') {
              // Extract binary data
              const binaryContent = content.substring(0, content.lastIndexOf('\r\n'));
              imageBuffer = Buffer.from(binaryContent, 'binary');
            }
          }
        }
        
        if (!imageBuffer) {
          res.writeHead(400, corsHeadersFile);
          res.end(JSON.stringify({ error: 'No image data received' }));
          return;
        }
        
        // Generate safe filename
        const safeFilename = filename 
          ? filename.replace(/[^a-zA-Z0-9.-]/g, '_')
          : `upload-${Date.now()}.jpg`;
        const imagePath = path.join(IMAGES_DIR, safeFilename);
        
        // Save image
        fs.writeFileSync(imagePath, imageBuffer);
        
        const relativePath = `./assets/images/${safeFilename}`;
        console.log(`✅ Image saved: ${relativePath}`);
        
        res.writeHead(200, corsHeadersFile);
        res.end(JSON.stringify({ 
          success: true, 
          path: relativePath,
          message: 'Image uploaded successfully'
        }));
      } catch (error) {
        console.error('❌ Error uploading image:', error);
        res.writeHead(500, corsHeadersFile);
        res.end(JSON.stringify({ error: error.message }));
      }
    });
    return;
  }

  // Handle data save
  if (req.method === 'POST' && url.pathname === '/api/save') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        // Validate data structure
        if (!data.personalInfo || !data.about) {
          res.writeHead(400, corsHeaders);
          res.end(JSON.stringify({ error: 'Invalid data structure' }));
          return;
        }
        
        // Write to website-data.json
        fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
        
        console.log(`✅ Updated website-data.json at ${new Date().toLocaleString()}`);
        
        res.writeHead(200, corsHeaders);
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Data saved successfully',
          timestamp: new Date().toISOString()
        }));
      } catch (error) {
        console.error('❌ Error saving data:', error);
        res.writeHead(500, corsHeaders);
        res.end(JSON.stringify({ error: error.message }));
      }
    });
    return;
  }
  
  res.writeHead(404, corsHeaders);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`🚀 Admin Dashboard Server running on http://localhost:${PORT}`);
  console.log(`📝 Updates will be saved to: ${JSON_FILE}`);
  console.log(`🖼️  Images will be saved to: ${IMAGES_DIR}`);
  console.log(`\n💡 Access admin at: http://localhost:${PORT}/admin`);
  console.log(`   Keep this server running while using the admin dashboard`);
  console.log(`   Press Ctrl+C to stop\n`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});

