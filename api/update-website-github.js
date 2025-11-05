// Vercel Serverless Function - GitHub API Auto-Commit
// Automatically commits website-data.json to GitHub - no manual commits needed!

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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
      
      const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
      const GITHUB_REPO = process.env.GITHUB_REPO || 'codeshinobii/efransia-resume';
      const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
      
      if (!GITHUB_TOKEN) {
        return res.status(500).json({ 
          error: 'GitHub token not configured',
          message: 'Add GITHUB_TOKEN to Vercel environment variables'
        });
      }
      
      // Convert data to JSON string
      const content = JSON.stringify(data, null, 2);
      const contentBase64 = Buffer.from(content).toString('base64');
      
      // Get current file SHA (if exists)
      let currentSha = null;
      try {
        const getResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contents/website-data.json`,
          {
            headers: {
              'Authorization': `token ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );
        
        if (getResponse.ok) {
          const fileData = await getResponse.json();
          currentSha = fileData.sha;
        }
      } catch (e) {
        // File doesn't exist yet, that's okay
      }
      
      // Commit file to GitHub
      const commitResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/website-data.json`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Update website content - ${new Date().toISOString()}`,
            content: contentBase64,
            branch: GITHUB_BRANCH,
            ...(currentSha && { sha: currentSha }) // Include SHA if updating existing file
          })
        }
      );
      
      if (commitResponse.ok) {
        const result = await commitResponse.json();
        return res.status(200).json({ 
          success: true, 
          message: 'Data saved and committed to GitHub! Vercel will auto-deploy.',
          commit: result.commit.sha,
          timestamp: new Date().toISOString()
        });
      } else {
        const error = await commitResponse.json();
        return res.status(commitResponse.status).json({ 
          error: 'GitHub commit failed',
          details: error.message
        });
      }
    } catch (error) {
      console.error('Error updating website:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

