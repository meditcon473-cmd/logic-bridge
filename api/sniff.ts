import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-id');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  console.log('Sniff API called:', req.method, req.url);

  if (req.method === 'POST') {
    try {
      const { prompt } = req.body as { prompt: string };
      console.log('Prompt received:', prompt);
      
      const types = ['DIALECTICAL', 'PHENOMENON', 'METAPHOR'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      return res.json({
        success: true,
        data: { type: randomType, confidence: 0.85 }
      });
    } catch (e: any) {
      console.error('Error:', e.message);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  return res.status(404).end('Not Found');
}