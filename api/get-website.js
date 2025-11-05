// Vercel Serverless Function to get website data
// Fetches from Vercel KV first, falls back to file

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Try to get from Vercel KV first
      const kvData = await kv.get('websiteData');
      
      if (kvData) {
        return res.status(200).json(kvData);
      }
      
      // If no KV data, return null (website-loader will try file)
      return res.status(404).json({ error: 'No data in KV, using file' });
    } catch (error) {
      console.error('Error retrieving from KV:', error);
      // Fallback to file - website-loader will handle it
      return res.status(404).json({ error: 'Using file fallback' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

