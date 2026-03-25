"use strict";
// ============================================
// 一帅三将·主板锻造舱 - RAG 灵魂语料库
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAG_REALMS = void 0;
exports.getRealmsByNode = getRealmsByNode;
exports.getRealmById = getRealmById;
/**
 * RAG 知识库 - 九大境界
 * 用于节点检索救援
 */
exports.RAG_REALMS = [
    // ========== 将1: 是什么 (What) - 认知维度 ==========
    {
        id: 1,
        name: "本质追溯",
        target_node: "jiang_1",
        core_concept: "透过现象看本质",
        t1_prompt: "看到这个现象，你的第一反应是什么？先说说你最直接的感受。",
        t2_perspectives: [
            "从表面到本质：这件事最核心的是什么？",
            "从结果到原因：为什么会变成这样？",
        ],
        t3_template: "所谓{主题}，本质上是对{本质}的深刻回应。",
    },
    {
        id: 2,
        name: "定义澄清",
        target_node: "jiang_1",
        core_concept: "厘清概念边界",
        t1_prompt: "你对这个词是怎么理解的？用自己的话说说看。",
        t2_perspectives: [
            "传统定义：字典或经典怎么说？",
            "当代理解：今天我们怎么看这个词？",
        ],
        t3_template: "{关键词}一词，自古有之，然今时今日，其内涵已悄然发生变化。",
    },
    {
        id: 3,
        name: "历史溯源",
        target_node: "jiang_1",
        core_concept: "以史为鉴",
        t1_prompt: "历史上有没有类似的事情？想想以前的人怎么处理。",
        t2_perspectives: [
            "纵向对比：与过去相比，有什么异同？",
            "横向类比：与其他国家/领域相比呢？",
        ],
        t3_template: "回望历史，我们发现{主题}从来不是新问题。",
    },
    // ========== 将2: 为什么 (Why) - 论证维度 ==========
    {
        id: 4,
        name: "因果分析",
        target_node: "jiang_2",
        core_concept: "追问为什么",
        t1_prompt: "你觉得为什么会这样？有哪些原因？",
        t2_perspectives: [
            "内因：根本性、决定性的原因",
            "外因：环境、条件、诱因",
        ],
        t3_template: "探究其根源，实乃{根本原因}使然。",
    },
    {
        id: 5,
        name: "价值论证",
        target_node: "jiang_2",
        core_concept: "意义与价值",
        t1_prompt: "这件事重要吗？有什么意义？",
        t2_perspectives: [
            "个人价值：对个人成长有什么帮助？",
            "社会价值：对社会发展有什么贡献？",
        ],
        t3_template: "其价值不仅在于{表层}，更在于{深层}。",
    },
    {
        id: 6,
        name: "利害分析",
        target_node: "jiang_2",
        core_concept: "利弊权衡",
        t1_prompt: "这样做有什么好处？有什么坏处？",
        t2_perspectives: [
            "利：积极影响、正面作用",
            "弊：潜在风险、负面影响",
        ],
        t3_template: "然而我们必须警惕{风险}，否则将导致{后果}。",
    },
    // ========== 将3: 怎么做 (How) - 实践维度 ==========
    {
        id: 7,
        name: "方法路径",
        target_node: "jiang_3",
        core_concept: "实践路径",
        t1_prompt: "如果要做到，你会怎么做？",
        t2_perspectives: [
            "个人层面：个人如何行动？",
            "社会层面：制度/文化如何保障？",
        ],
        t3_template: "具体而言，需从以下路径着手：一是{路径1}，二是{路径2}。",
    },
    {
        id: 8,
        name: "案例佐证",
        target_node: "jiang_3",
        core_concept: "实例支撑",
        t1_prompt: "有没有例子可以证明这个观点？",
        t2_perspectives: [
            "正面案例：成功的经验",
            "反面案例：失败的教训",
        ],
        t3_template: "君不见{案例}，正是{论点}的最佳佐证。",
    },
    {
        id: 9,
        name: "展望呼吁",
        target_node: "jiang_3",
        core_concept: "升华结尾",
        t1_prompt: "展望未来，你有什么期望或呼吁？",
        t2_perspectives: [
            "理性展望：基于现状的未来预测",
            "情感呼吁：呼吁行动或改变",
        ],
        t3_template: "让我们共同期待{愿景}，并为之努力奋斗！",
    },
];
/**
 * 根据节点类型检索知识库
 */
function getRealmsByNode(node) {
    return exports.RAG_REALMS.filter((realm) => realm.target_node === node);
}
/**
 * 根据 ID 获取知识条目
 */
function getRealmById(id) {
    return exports.RAG_REALMS.find((realm) => realm.id === id);
}
