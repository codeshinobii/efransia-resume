// Vercel Serverless Function - Simple file-based storage
// Uses Vercel Blob Storage - easier than KV!

import { put, head } from '@vercel/blob';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;
      
      // Validate data structure
      if (!data.personalInfo || !data.about) {
        return res.status(400).json({ error: 'Invalid data structure' });
      }
      
      // Save to Vercel Blob Storage
      const blob = await put('website-data.json', JSON.stringify(data, null, 2), {
        access: 'public',
        contentType: 'application/json',
      });
      
      console.log('✅ Saved to Vercel Blob:', blob.url);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Data saved successfully',
        url: blob.url,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating website:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      // Try to get from blob storage
      // Note: For GET, we'll use the public URL
      // In production, this would be: https://your-blob-store.vercel-storage.com/website-data.json
      return res.status(200).json({ 
        message: 'Use public blob URL',
        note: 'Blob storage is accessed via public URL'
      });
    } catch (error) {
      console.error('Error retrieving:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
