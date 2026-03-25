"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildZhiyinGraph = buildZhiyinGraph;
exports.runZhiyin = runZhiyin;
/* eslint-disable @typescript-eslint/no-explicit-any */
const langgraph_1 = require("@langchain/langgraph");
const langgraph_2 = require("@langchain/langgraph");
const prompts_1 = require("./config/prompts");
const rag_realms_1 = require("./knowledge/rag_realms");
// ============================================
// 1. 节点函数定义 (Dummy Nodes + Prompt 装配)
// ============================================
async function snifferNode(state) {
    console.log(`[SnifferNode] 收到原始题目: "${state.raw_prompt}"`);
    console.log(`[SnifferNode] 当前节点: ${state.current_node}`);
    let engineData;
    const prompt = state.raw_prompt.toLowerCase();
    if (prompt.includes("隐喻") || prompt.includes("比喻") || prompt.includes("物")) {
        engineData = {
            type: "METAPHOR",
            physical_entities: [],
            dynamic_processes: [],
            social_mapping: {},
        };
        console.log(`[SnifferNode] 判定结果: METAPHOR (隐喻引擎)`);
    }
    else if (prompt.includes("现象") || prompt.includes("怎么看") || prompt.includes("谈谈")) {
        engineData = {
            type: "PHENOMENON",
            subject: "",
            behavior: "",
            six_dim_perspective: "",
            essence_insight: "",
        };
        console.log(`[SnifferNode] 判定结果: PHENOMENON (现象引擎)`);
    }
    else if (prompt.includes("辩证") || prompt.includes("取舍") || prompt.includes("平衡") || prompt.includes("与")) {
        engineData = {
            type: "DIALECTICAL",
            concept_A: "",
            concept_B: "",
            gravity_field: "",
        };
        console.log(`[SnifferNode] 判定结果: DIALECTICAL (思辨引擎)`);
    }
    else {
        engineData = {
            type: "UNKNOWN",
            clarification_needed: true,
        };
        console.log(`[SnifferNode] 判定结果: UNKNOWN (需要澄清)`);
    }
    return { engine_data: engineData, current_node: "SnifferNode" };
}
async function clarificationNode(state) {
    console.log(`[ClarificationNode] 进入澄清节点`);
    console.log(`[ClarificationNode] 需要澄清: ${state.engine_data.clarification_needed}`);
    return {
        current_node: "ClarificationNode",
        error_logs: [...state.error_logs, "[ClarificationNode] 需要用户澄清题型"],
    };
}
/**
 * 隐喻引擎节点
 * 装配 METAPHOR_PROMPT
 */
async function metaphorEngineNode(state) {
    console.log(`[MetaphorEngineNode] 进入隐喻引擎`);
    // 装配 Prompt（模板 + 当前状态变量）
    const assembledPrompt = `${prompts_1.METAPHOR_PROMPT}\n\n当前题目: ${state.raw_prompt}`;
    console.log(`[MetaphorEngineNode] 装配后的 Prompt:\n${assembledPrompt}\n`);
    // 演示 RAG 检索
    const jiang1Realms = (0, rag_realms_1.getRealmsByNode)("jiang_1");
    console.log(`[MetaphorEngineNode] RAG 检索 - jiang_1 知识库: ${jiang1Realms.length} 条`);
    const mockData = {
        type: "METAPHOR",
        physical_entities: ["种子", "土壤", "阳光"],
        dynamic_processes: ["萌芽", "生长", "绽放"],
        social_mapping: { 种子: "青年", 土壤: "时代", 阳光: "机遇" },
    };
    return { engine_data: mockData, current_node: "MetaphorEngineNode" };
}
/**
 * 现象引擎节点
 * 装配 PHENOMENON_PROMPT
 */
async function phenomenonEngineNode(state) {
    console.log(`[PhenomenonEngineNode] 进入现象引擎`);
    // 装配 Prompt
    const assembledPrompt = `${prompts_1.PHENOMENON_PROMPT}\n\n当前题目: ${state.raw_prompt}`;
    console.log(`[PhenomenonEngineNode] 装配后的 Prompt:\n${assembledPrompt}\n`);
    // 演示 RAG 检索
    const jiang2Realms = (0, rag_realms_1.getRealmsByNode)("jiang_2");
    console.log(`[PhenomenonEngineNode] RAG 检索 - jiang_2 知识库: ${jiang2Realms.length} 条`);
    const mockData = {
        type: "PHENOMENON",
        subject: "AI时代",
        behavior: "年轻人过度依赖AI完成作业",
        six_dim_perspective: "个人成长/教育本质/技术伦理/社会影响/未来趋势/解决方案",
        essence_insight: "工具不应替代思考",
    };
    return { engine_data: mockData, current_node: "PhenomenonEngineNode" };
}
/**
 * 思辨引擎节点
 * 装配 DIALECTICAL_PROMPT
 */
async function dialecticalEngineNode(state) {
    console.log(`[DialecticalEngineNode] 进入思辨引擎`);
    // 装配 Prompt
    const assembledPrompt = `${prompts_1.DIALECTICAL_PROMPT}\n\n当前题目: ${state.raw_prompt}`;
    console.log(`[DialecticalEngineNode] 装配后的 Prompt:\n${assembledPrompt}\n`);
    // 演示 RAG 检索
    const jiang3Realms = (0, rag_realms_1.getRealmsByNode)("jiang_3");
    console.log(`[DialecticalEngineNode] RAG 检索 - jiang_3 知识库: ${jiang3Realms.length} 条`);
    const mockData = {
        type: "DIALECTICAL",
        concept_A: "科技发展",
        concept_B: "人文关怀",
        gravity_field: "在追求效率的同时，如何守护人性的温度",
    };
    return { engine_data: mockData, current_node: "DialecticalEngineNode" };
}
/**
 * SynthesisNode - 聚将成帅
 * 装配 SYNTHESIS_PROMPT
 */
async function synthesisNode(state) {
    console.log(`[SynthesisNode] 进入数据汇流器`);
    // 装配 Prompt
    const assembledPrompt = `${prompts_1.SYNTHESIS_PROMPT}\n\n引擎数据: ${JSON.stringify(state.engine_data)}\n原始题目: ${state.raw_prompt}`;
    console.log(`[SynthesisNode] 装配后的 Prompt:\n${assembledPrompt}\n`);
    let commander = "";
    if (state.engine_data.type === "METAPHOR") {
        const keys = Object.keys(state.engine_data.social_mapping);
        commander = `青年如${keys[0]}，于${keys[1]}中汲取养分，以${keys[2]}为指引，方能绽放光彩`;
    }
    else if (state.engine_data.type === "PHENOMENON") {
        commander = `${state.engine_data.essence_insight}——这是我们在${state.engine_data.subject}时代必须直面的命题`;
    }
    else if (state.engine_data.type === "DIALECTICAL") {
        commander = `${state.engine_data.gravity_field}，这需要我们在${state.engine_data.concept_A}与${state.engine_data.concept_B}之间找到平衡`;
    }
    console.log(`[SynthesisNode] 生成中心论点 (commander): "${commander}"`);
    return { commander, current_node: "SynthesisNode" };
}
// 六段流水线
async function fengtouNode(state) {
    console.log(`[fengtouNode] 凤头 - 开头段落`);
    return { current_node: "fengtouNode" };
}
async function jiang1Node(state) {
    console.log(`[jiang1Node] 将1 - 第一个分论点`);
    // 使用 RAG 知识库
    const realms = (0, rag_realms_1.getRealmsByNode)("jiang_1");
    console.log(`[jiang1Node] RAG 检索结果: ${JSON.stringify(realms.map(r => ({ id: r.id, name: r.name })))}`);
    return { generals: { ...state.generals, jiang_1: "分论点1已生成" }, current_node: "jiang1Node" };
}
async function jiang2Node(state) {
    console.log(`[jiang2Node] 将2 - 第二个分论点`);
    const realms = (0, rag_realms_1.getRealmsByNode)("jiang_2");
    console.log(`[jiang2Node] RAG 检索结果: ${JSON.stringify(realms.map(r => ({ id: r.id, name: r.name })))}`);
    return { generals: { ...state.generals, jiang_2: "分论点2已生成" }, current_node: "jiang2Node" };
}
async function zhuanNode(state) {
    console.log(`[zhuanNode] 转 - 转折段落`);
    return { current_node: "zhuanNode" };
}
async function jiang3Node(state) {
    console.log(`[jiang3Node] 将3 - 第三个分论点`);
    const realms = (0, rag_realms_1.getRealmsByNode)("jiang_3");
    console.log(`[jiang3Node] RAG 检索结果: ${JSON.stringify(realms.map(r => ({ id: r.id, name: r.name })))}`);
    return { generals: { ...state.generals, jiang_3: "分论点3已生成" }, current_node: "jiang3Node" };
}
async function baoweiNode(state) {
    console.log(`[baoweiNode] 豹尾 - 结尾段落`);
    return { current_node: "baoweiNode" };
}
// ============================================
// 2. 条件边路由函数
// ============================================
function routeFromSniffer(state) {
    const engineType = state.engine_data.type;
    console.log(`[routeFromSniffer] 路由决策: ${engineType}`);
    switch (engineType) {
        case "METAPHOR": return "metaphor_engine";
        case "PHENOMENON": return "phenomenon_engine";
        case "DIALECTICAL": return "dialectical_engine";
        default: return "clarification";
    }
}
// ============================================
// 3. Graph Builder - 使用 Zod Schema
// ============================================
const zod_1 = require("zod");
const ZhiyinStateSchema = zod_1.z.object({
    raw_prompt: zod_1.z.string(),
    messages: zod_1.z.array(zod_1.z.any()),
    engine_data: zod_1.z.any(),
    commander: zod_1.z.string(),
    generals: zod_1.z.object({
        jiang_1: zod_1.z.string(),
        jiang_2: zod_1.z.string(),
        jiang_3: zod_1.z.string(),
    }),
    current_node: zod_1.z.string(),
    error_logs: zod_1.z.array(zod_1.z.string()),
});
function buildZhiyinGraph() {
    const workflow = new langgraph_2.StateGraph(ZhiyinStateSchema);
    // 添加节点
    workflow.addNode("sniffer", snifferNode);
    workflow.addNode("clarification", clarificationNode);
    workflow.addNode("metaphor_engine", metaphorEngineNode);
    workflow.addNode("phenomenon_engine", phenomenonEngineNode);
    workflow.addNode("dialectical_engine", dialecticalEngineNode);
    workflow.addNode("synthesis", synthesisNode);
    workflow.addNode("fengtou", fengtouNode);
    workflow.addNode("jiang_1", jiang1Node);
    workflow.addNode("jiang_2", jiang2Node);
    workflow.addNode("zhuan", zhuanNode);
    workflow.addNode("jiang_3", jiang3Node);
    workflow.addNode("baowei", baoweiNode);
    // 添加边
    // @ts-ignore
    workflow.addEdge("__start__", "sniffer");
    // @ts-ignore
    workflow.addConditionalEdges("sniffer", routeFromSniffer, {
        metaphor_engine: "metaphor_engine",
        phenomenon_engine: "phenomenon_engine",
        dialectical_engine: "dialectical_engine",
        clarification: "clarification",
    });
    // @ts-ignore
    workflow.addEdge("clarification", "sniffer");
    // @ts-ignore
    workflow.addEdge("metaphor_engine", "synthesis");
    // @ts-ignore
    workflow.addEdge("phenomenon_engine", "synthesis");
    // @ts-ignore
    workflow.addEdge("dialectical_engine", "synthesis");
    // @ts-ignore
    workflow.addEdge("synthesis", "fengtou");
    // @ts-ignore
    workflow.addEdge("fengtou", "jiang_1");
    // @ts-ignore
    workflow.addEdge("jiang_1", "jiang_2");
    // @ts-ignore
    workflow.addEdge("jiang_2", "zhuan");
    // @ts-ignore
    workflow.addEdge("zhuan", "jiang_3");
    // @ts-ignore
    workflow.addEdge("jiang_3", "baowei");
    // @ts-ignore
    workflow.addEdge("baowei", langgraph_1.END);
    return workflow.compile();
}
// ============================================
// 4. 入口函数
// ============================================
async function runZhiyin(prompt) {
    const graph = buildZhiyinGraph();
    const initialState = {
        raw_prompt: prompt,
        messages: [],
        engine_data: { type: "UNKNOWN", clarification_needed: false },
        commander: "",
        generals: { jiang_1: "", jiang_2: "", jiang_3: "" },
        current_node: "START",
        error_logs: [],
    };
    console.log("\n========== 织引系统启动 ==========\n");
    const result = await graph.invoke(initialState);
    console.log("\n========== 织引系统完成 ==========\n");
    console.log("最终状态:", JSON.stringify(result, null, 2));
    return result;
}
