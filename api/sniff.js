module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-id');
  
  if (req.method === 'OPTIONS') {
    res.status(200).send('OK');
    return;
  }

  console.log('Sniff API called:', req.method, req.url);

  if (req.method === 'POST') {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const body = Buffer.concat(buffers).toString();
      const { prompt } = JSON.parse(body);
      console.log('Prompt received:', prompt);
      
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        data: { type: 'DIALECTICAL', confidence: 0.85 }
      }));
    } catch (e) {
      console.error('Error:', e.message);
      res.status(500).json({ success: false, error: e.message });
    }
    return;
  }

  res.status(404).end('Not Found');
};