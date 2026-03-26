const express = require('express');

const app = express();

// CORS 支持
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-user-id');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '10mb' }));

// 雷达嗅探接口
app.post('/api/sniff', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Received sniff request:', prompt);
    
    const types = ['DIALECTICAL', 'PHENOMENON', 'METAPHOR'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    res.json({
      success: true,
      data: {
        type: randomType,
        confidence: 0.85
      }
    });
  } catch (error) {
    console.error('Sniff error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 评分接口
app.post('/api/grade', async (req, res) => {
  res.json({
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
  });
});

// 用户信息接口
app.get('/api/me', (req, res) => {
  const userId = req.headers['x-user-id'];
  res.json({
    success: true,
    user: { id: userId || 1, real_name: '测试学员', level: 1, xp: 0 }
  });
});

// 任务接口
app.get('/api/mission/active', (req, res) => {
  res.json({
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
  });
});

// 战斗提交接口
app.post('/api/combat', async (req, res) => {
  res.json({
    success: true,
    isPassed: true,
    feedback: { feedback: '写得不错！' }
  });
});

// OCR 接口
app.post('/api/ocr', async (req, res) => {
  res.json({
    success: true,
    data: { recognized_text: '这是识别到的作文文字...' }
  });
});

// 审核聊天接口
app.post('/api/audit_chat', async (req, res) => {
  res.json({
    success: true,
    data: {
      reply: '好的，我明白了。请继续阐述你的观点。',
      step: '第二轮问答',
      is_passed: false
    }
  });
});

// Vercel Serverless 导出
module.exports = app;