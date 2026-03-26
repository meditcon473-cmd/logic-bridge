module.exports = (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-id');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  // 解析 path
  const url = req.url.split('?')[0];
  console.log('API request:', req.method, url);

  if (url === '/api/sniff' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { prompt } = JSON.parse(body);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          success: true,
          data: { type: 'DIALECTICAL', confidence: 0.85 }
        }));
      } catch (e) {
        res.status(500).json({ success: false, error: e.message });
      }
    });
    return;
  }

  res.status(404).end('Not Found');
};