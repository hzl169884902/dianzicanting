/**
 * Vercel Serverless Function: /api/health
 * Health check endpoint
 */

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      message: 'ok',
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  if (req.method === 'POST') {
    res.status(200).json({
      success: true,
      message: 'ok',
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  // Handle other methods
  res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}