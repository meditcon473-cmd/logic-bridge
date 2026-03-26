import express from 'express';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-user-id');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// MiniMax API 配置
const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || 'your-api-key-here';
const MINIMAX_BASE_URL = 'https://api.minimax.chat/v1/text/chatcompletion_v2';

// 完整的 System Prompt
const SYSTEM_PROMPT = `你是一个极其严谨、具备极高文学素养的高中语文作文阅卷专家。你的唯一任务是对用户输入的"高考作文材料"进行【靶标属性】的精准分类。为了确保 0 误差，你必须严格按照以下【四步决策树】进行思考，并参考教官提供的【30道黄金题库】进行特征比对。

### 🧠 第一部分：四步决策树 (执行逻辑)
在给出结论前，你必须在心中严格执行以下 4 步：
1. **提取核心**：找出材料中的核心意象或事件（是谁？在干什么？抛出了什么概念？）。
2. **鉴别隐喻 (METAPHOR)**：核心意象是不是自然物（动植物、山水）、人造物（桥梁、棋局）或寓言故事？字面意思能不能直接当真？如果字面只是表象，必须通过"三步解码（由物及人、由表及里、由特殊到一般）"翻译成人类社会的哲理，则【立刻判定为 METAPHOR】，停止后续判断。
3. **鉴别思辨 (DIALECTICAL)**：如果不是隐喻。材料中是否明确出现了两个或多个相对立、相辅相成、张力与错位的抽象概念？（如：认可度与自身价值、快与慢、客观价值与时代需要）。要求探讨它们的关系？如果是，则【立刻判定为 DIALECTICAL】。
4. **鉴别现象 (PHENOMENON)**：如果既没有借物喻理，也没有抽象概念的纯粹对比，而是紧扣时代脉搏，直接、客观地白描了当下的某种社会现象、群体心理、具体的新闻事件或宏观时代背景。则【判定为 PHENOMENON】。

### 📚 第二部分：黄金题库 (核心对标语料库)
请深度对标以下历年高考经典真题的分类与破题逻辑：

【类别 1：METAPHOR（隐喻与寓言类）】
- [围棋]"本手、妙手、俗手" -> 隐喻：基础夯实与创新创造、急功近利之间的关系。
- [二战战机]"幸存者偏差" -> 隐喻：看问题不能停留在表象，需透视本质。
- [书法]"人"字形描红 -> 隐喻：人的成长规律、相互支撑与动态平衡。
- [自然物]"大树与小鸟的约定"、"切割钻石"、"猫吃鱼与捉老鼠"、"喂食野生动物"、"乌鸦学老鹰捉羊" -> 隐喻：因循守旧与顺应时代、经验主义与勇气、物质享受与坚守本职、溺爱施舍与独立生存、盲从与自我认知。
- [生活画卷]"奖惩漫画"、"涂抹与底色" -> 隐喻：教育功利主义与唯分数论、人生阅历与青年初心。

【类别 2：DIALECTICAL（二元思辨类）】
- [个人与外界]"认可度"与"自身价值"、"被需要"与"需要"。
- [动机与演变]"好奇心"与"其他动机"、"发问"与"结论"。
- [客观与时代]"客观价值"与"时代需要"、"转折"与"发展过程"。
- [文化与技术]"直接移用、化用、独创"、"做时间的主人"与"做技术的仆人"。
- [哲学命题]"强与弱的转化"、"五味调和，共存相生"。

【类别 3：PHENOMENON（社会现象评析类）】
- [时代与科技]"问题越来越少还是越来越多？"、"安静一下不被打扰"、"抵达未知之境"（中国探月工程）。
- [文化与微观社会]"故事的力量"、"画漫画的老师"（微观尊师重教现象）、"女儿举报父亲高速接电话"（情与法、私人情感与公共安全的伦理冲突）。
- [宏观与青年]"可为与有为"、"携手同一世界"、"五四百年，青年当自强"、"世纪宝宝与中国梦"（个人命运与国家时代发展同频共振）。

### ⚙️ 第三部分：强制输出格式
你必须先输出 \`<thinking>\` 标签展示你的四步决策过程，然后再输出标准的 JSON 结果。

【示例输出格式】：
<thinking>
1. 提取核心：种子、泥土、沉默、绽放。
2. 鉴别隐喻：核心意象是"种子"（自然物）。字面意思不可直接作为人类社会行为。必须"由物及人"翻译：种子隐喻默默蛰伏的人，泥土隐喻逆境，绽放隐喻成功。完美符合 METAPHOR 特征。
3. 结论：METAPHOR。
</thinking>
\`\`\`json
{
  "type": "METAPHOR",
  "confidence": 0.98,
  "reason": "材料以自然界的'种子'在泥土中沉默为表象，隐喻人在逆境中默默蓄力以求最终爆发的过程，属于典型的借物喻理（隐喻类）。"
}`;

// Radar sniff API - 使用 MiniMax 进行智能分类
app.post('/api/sniff', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Sniff request:', prompt);
    
    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: '请提供作文材料内容' 
      });
    }

    // 构建请求消息
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `请分析以下高考作文材料进行分类：\n\n${prompt}` }
    ];

    // 调用 MiniMax API
    const response = await fetch(MINIMAX_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MINIMAX_API_KEY}`
      },
      body: JSON.stringify({
        model: 'abab6.5s-chat',
        messages: messages,
        temperature: 0.1,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MiniMax API error:', errorText);
      throw new Error(`MiniMax API failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('MiniMax response:', result);

    // 解析返回内容
    const assistantMessage = result.choices?.[0]?.message?.content || '';
    
    // 提取 JSON 结果
    let type = 'PHENOMENON'; // 默认
    let confidence = 0.7;
    let reason = '';

    // 尝试从返回内容中提取 JSON
    const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        type = parsed.type || type;
        confidence = parsed.confidence || confidence;
        reason = parsed.reason || reason;
      } catch (e) {
        console.error('Parse JSON error:', e);
      }
    }

    // 如果没有解析到有效结果，使用默认分类
    if (!['METAPHOR', 'DIALECTICAL', 'PHENOMENON'].includes(type)) {
      type = 'PHENOMENON';
    }

    res.json({
      success: true,
      data: { 
        type, 
        confidence: Math.min(confidence, 0.99),
        reason,
        rawResponse: assistantMessage
      }
    });
  } catch (error) {
    console.error('Sniff error:', error);
    // 失败时返回默认值而不是报错
    res.json({
      success: true,
      data: { 
        type: 'PHENOMENON', 
        confidence: 0.5,
        reason: 'API调用失败，使用默认分类'
      }
    });
  }
});

// Grade API
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

// User info API
app.get('/api/me', (req, res) => {
  const userId = req.headers['x-user-id'] || '1';
  res.json({
    success: true,
    user: { id: userId, real_name: '测试学员', level: 1, xp: 0 }
  });
});

// Mission API
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

// Combat API
app.post('/api/combat', async (req, res) => {
  res.json({
    success: true,
    isPassed: true,
    feedback: { feedback: '写得不错！' }
  });
});

// OCR API
app.post('/api/ocr', async (req, res) => {
  res.json({
    success: true,
    data: { recognized_text: '这是识别到的作文文字...' }
  });
});

// Audit chat API
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

// Vercel export
export default app;