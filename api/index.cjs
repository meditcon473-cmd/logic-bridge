// Vercel Serverless 格式 - 不使用 Express，直接导出 handler
module.exports = async (req, res) => {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-id');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  const path = req.url || '/';
  console.log('Request:', req.method, path);

  // 雷达嗅探接口
  if (path === '/api/sniff' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { prompt } = JSON.parse(body);
        const types = ['DIALECTICAL', 'PHENOMENON', 'METAPHOR'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          success: true,
          data: { type: randomType, confidence: 0.85 }
        }));
      } catch (e) {
        res.status(500).json({ success: false, error: e.message });
      }
    });
    return;
  }

  // 评分接口
  if (path === '/api/grade' && req.method === 'POST') {
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

  // 用户信息接口
  if (path === '/api/me' && req.method === 'GET') {
    const userId = req.headers['x-user-id'] || '1';
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      user: { id: userId, real_name: '测试学员', level: 1, xp: 0 }
    }));
    return;
  }

  // 任务接口
  if (path === '/api/mission/active' && req.method === 'GET') {
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

  // 战斗提交接口
  if (path === '/api/combat' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      isPassed: true,
      feedback: { feedback: '写得不错！' }
    }));
    return;
  }

  // OCR 接口
  if (path === '/api/ocr' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      data: { recognized_text: '这是识别到的作文文字...' }
    }));
    return;
  }

  // 审核聊天接口
  if (path === '/api/audit_chat' && req.method === 'POST') {
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

  // 默认返回 404
  res.status(404).end('Not Found');
};