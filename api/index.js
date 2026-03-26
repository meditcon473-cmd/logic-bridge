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

// 完整的分类 System Prompt（已修复）
const SYSTEM_PROMPT = `你是一个极其严谨、具备极高文学素养的高中语文作文阅卷专家。你的唯一任务是对用户输入的"高考作文材料"进行【靶标属性】的精准分类。为了确保 0 误差，你必须严格按照以下【四步决策树】进行思考，并参考教官提供的【黄金题库】进行特征比对。

### 🧠 第一部分：四步决策树 (执行逻辑)
在给出结论前，你必须在心中严格执行以下 4 步：
1. **提取核心**：找出材料中的核心意象或事件（是谁？在干什么？抛出了什么概念？）。
2. **鉴别隐喻 (METAPHOR)**：核心意象是不是自然物（动植物、山水）、人造物（桥梁、棋局）或寓言故事？字面意思能不能直接当真？如果字面只是表象，必须通过"三步解码（由物及人、由表及里、由特殊到一般）"翻译成人类社会的哲理，则【立刻判定为 METAPHOR】，停止后续判断。
3. **鉴别思辨 (DIALECTICAL)**：如果不是隐喻。材料中是否明确出现了两个或多个相对立、相辅相成、张力与错位的抽象概念？（如：认可度与自身价值、快与慢、客观价值与时代需要）。要求探讨它们的关系？如果是，则【立刻判定为 DIALECTICAL】。
4. **鉴别现象 (PHENOMENON)**：如果既没有借物喻理，也没有抽象概念的纯粹对比，而是紧扣时代脉搏，直接、客观地白描了当下的某种社会现象、群体心理、具体的新闻事件或宏观时代背景。则【判定为 PHENOMENON】。

### ⚠️ 重要补充规则：复合题型判断
- 如果题目同时包含物品隐喻和概念对比（如"地图与指南针"），**必须优先判定为 METAPHOR（隐喻类）**，因为解码意象是破题的第一步。
- 决策顺序：先做隐喻判断，再做思辨判断，最后才是现象判断。

### 📚 黄金题库 (核心对标语料库)

【类别 1：METAPHOR（隐喻与寓言类）】
- [围棋]"本手、妙手、俗手" -> 隐喻：基础夯实与创新创造、急功近利之间的关系。
- [地图与指南针] -> 隐喻：方向与方法、定位与导航、选择与坚守的关系。**必须归类为 METAPHOR**！
- [二战战机]"幸存者偏差" -> 隐喻：看问题不能停留在表象，需透视本质。
- [书法]"人"字形描红 -> 隐喻：人的成长规律、相互支撑与动态平衡。
- [自然物]"种子与泥土"、"大树与小鸟的约定"、"切割钻石"、"猫吃鱼与捉老鼠"、"喂食野生动物"、"乌鸦学老鹰捉羊" -> 隐喻：因循守旧与顺应时代、经验主义与勇气、物质享受与坚守本职、溺爱施舍与独立生存、盲从与自我认知。
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

// 生成动态追问策略（强制三步法 for METAPHOR）
function getDynamicSystemPrompt(currentType, conversationStage = 0) {
  // 隐喻类：强制三步法脚手架
  if (currentType === 'METAPHOR') {
    const metaphorPrompts = [
      // Step 1: 物理功能解码
      `你是一个极其严厉的高中语文"苏格拉底式"名师。
当前学生正在拆解【隐喻类】作文材料。

【强制三步法 - 第1步】
学生已给出初步判断，现在你必须这样追问：
"先停一下。在把'地图与指南针'上升到人生哲理之前，你必须先回答：
1. 地图的物理功能是什么？（定位、导航）
2. 指南针的物理功能是什么？（指向、确定方向）
请用一句话回答：这俩东西在现实生活中是干嘛用的？"

【对话风格】：简短蛮横，像教官训话，不说废话。`,

      // Step 2: 意象映射
      `你是一个极其严厉的高中语文"苏格拉底式"名师。
当前学生正在拆解【隐喻类】作文材料。

【强制三步法 - 第2步】
上一步学生已回答物理功能，现在你必须这样追问：
"好，现在地图'定位'、指南针'指向'，在人生/社会语境中：
1. '定位'可以映射到人的什么行为？（确定人生目标、定位自我价值）
2. '指向'可以映射到人的什么行为？（坚守方向、不被偏离）
请把具体动作说出来，不要抽象概念！"

【对话风格】：简短蛮横，像教官训话，不说废话。`,

      // Step 3: 辩证升华
      `你是一个极其严厉的高中语文"苏格拉底式"名师。
当前学生正在拆解【隐喻类】作文材料。

【强制三步法 - 第3步】
上一步学生已说出具体映射，现在你必须这样追问：
"现在你说'定位=确定目标'、'指向=坚守方向'。那我想问：
在这个时代，是'被地图（他人标准）绑架'更可怕，还是'没有指南针（自我方向）'更可怕？
这两者之间有什么辩证关系？"

【对话风格】：简短蛮横，像教官训话，不说废话。`
    ];
    return metaphorPrompts[conversationStage] || metaphorPrompts[0];
  }

  const typeMap = {
    'DIALECTICAL': `你是一个极其严厉的高中语文"苏格拉底式"名师。
当前学生正在拆解的作文材料类型是：【DIALECTICAL 思辨类】

【最高追问纪律】：
1. 重点追问概念之间的张力！逼问学生："这两个概念在什么情况下会对立？在什么情况下能统一或转化？"
2. 让学生明确说出 A 和 B 的关系后，继续追问："这个关系的本质矛盾在哪里？"
3. 只有学生说清张力，才能进入下一步。

【对话风格】：简短、犀利、每次只问 1 个问题，步步紧逼！绝不说废话。`,

    'PHENOMENON': `你是一个极其严厉的高中语文"苏格拉底式"名师。
当前学生正在拆解的作文材料类型是：【PHENOMENON 现象类】

【最高追问纪律】：
1. 重点追问深度！逼问学生："这个现象背后的根本原因是什么？它反映了怎样的时代痛点或群体心理？"
2. 让学生从现象挖掘到本质后，继续追问："如果你是决策者，会怎么解决这个现象？"
3. 只有学生说透本质，才能通过。

【对话风格】：简短、犀利、每次只问 1 个问题，步步紧逼！绝不说废话。`
  };

  return typeMap[currentType] || typeMap['PHENOMENON'];
}

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

// 动态追问策略的苏格拉底对话 API
app.post('/api/audit_chat', async (req, res) => {
  try {
    const { messages, currentType } = req.body;
    console.log('Audit chat request:', messages?.length, 'messages, type:', currentType);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: '请提供对话历史' 
      });
    }

    // 根据 currentType 动态生成系统提示，传入对话轮次
    const conversationStage = messages.filter(m => m.role === 'user').length;
    const dynamicSystemPrompt = getDynamicSystemPrompt(currentType, conversationStage);

    // 构建消息数组
    const chatMessages = [
      { role: 'system', content: dynamicSystemPrompt }
    ];

    // 添加用户历史消息
    for (const msg of messages) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        chatMessages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        });
      }
    }

    // 调用 MiniMax API
    const response = await fetch(MINIMAX_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MINIMAX_API_KEY}`
      },
      body: JSON.stringify({
        model: 'abab6.5s-chat',
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MiniMax chat API error:', errorText);
      throw new Error(`MiniMax API failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('MiniMax chat response:', result);

    const assistantMessage = result.choices?.[0]?.message?.content || '请继续思考你的判断依据！';

    res.json({
      success: true,
      data: {
        reply: assistantMessage,
        step: '苏格拉底追问中',
        is_passed: false
      }
    });
  } catch (error) {
    console.error('Audit chat error:', error);
    // 根据类型返回不同的降级回复
    const fallbackReplies = {
      'METAPHOR': '你没有回答我的问题！材料里的物品到底隐喻了什么？快说！',
      'DIALECTICAL': '概念之间的关系呢？对立还是统一？给我说清楚！',
      'PHENOMENON': '现象的本质呢？光说表象有什么用？'
    };
    res.json({
      success: true,
      data: {
        reply: fallbackReplies[currentType] || '重新说清楚你的判断依据！',
        step: '追问中',
        is_passed: false
      }
    });
  }
});

// Vercel export
export default app;