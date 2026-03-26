module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-id');
  
  if (req.method === 'OPTIONS') {
    res.status(200).send('OK');
    return;
  }

  // Vercel rewrites 会把 /api/xxx 转成 /xxx
  const path = req.url?.split('?')[0] || '/';
  console.log('API Request:', req.method, path);

  // 雷达嗅探 - Vercel 转发后 path 是 /sniff
  if (path === '/sniff' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { prompt } = JSON.parse(body);
        console.log('Prompt:', prompt);
        
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

  // 评分接口
  if (path === '/grade' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      data: {
        score_content: 25,
        score_structure: 15,
        score_language: 15,
        score_total: 55,
        topic_accuracy: '基本准确',
        topic_comment: '立意较为准确',
        reasoning: '结构完整',
        actionable_advice: '可以改进',
        upgrade_demo: '示例示范'
      }
    }));
    return;
  }

  // 用户信息
  if (path === '/me' && req.method === 'GET') {
    const userId = req.headers['x-user-id'] || '1';
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      user: { id: userId, real_name: '测试学员', level: 1, xp: 0 }
    }));
    return;
  }

  // 任务接口
  if (path === '/mission/active' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      data: {
        title: '高考作文训练',
        material_content: '青年与时代',
        task_stage_1: '请输入中心论点',
        task_stage_2: '请输入第一将分论点',
        task_stage_3: '请输入第二将分论点',
        task_stage_4: '请输入第三将分论点',
        task_stage_5: '请输入核心语段'
      }
    }));
    return;
  }

  // 战斗提交
  if (path === '/combat' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      isPassed: true,
      feedback: { feedback: '写得不错！' }
    }));
    return;
  }

  // OCR
  if (path === '/ocr' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      data: { recognized_text: '这是识别到的作文文字...' }
    }));
    return;
  }

  // 审核聊天
  if (path === '/audit_chat' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      data: {
        reply: '好的，我明白了。请继续阐述你的观点。',
        step: '第二轮问答',
        is_passed: false
      }
    }));
    return;
  }

  // 404
  res.status(404).end('Not Found');
};