#!/usr/bin/env node
/**
 * Simple Local Server for Admin Dashboard
 * Automatically updates website-data.json when admin saves changes
 * 
 * Usage: node server.js
 * Then open admin.html and make changes - they'll auto-save!
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const JSON_FILE = path.join(__dirname, 'website-data.json');

// Enable CORS for local development
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Only handle POST requests
  if (req.method === 'POST' && req.url === '/api/save') {
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
  } else {
    res.writeHead(404, corsHeaders);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Admin Dashboard Server running on http://localhost:${PORT}`);
  console.log(`📝 Updates will be saved to: ${JSON_FILE}`);
  console.log(`\n💡 Keep this server running while using the admin dashboard`);
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

