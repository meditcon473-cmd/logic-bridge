"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZhiyinAnnotation = void 0;
exports.isMetaphorEngineData = isMetaphorEngineData;
exports.isPhenomenonEngineData = isPhenomenonEngineData;
exports.isDialecticalEngineData = isDialecticalEngineData;
exports.isUnknownEngineData = isUnknownEngineData;
const langgraph_1 = require("@langchain/langgraph");
// ============================================
// 2. 类型守卫 (Type Guards)
// ============================================
function isMetaphorEngineData(data) {
    return data.type === "METAPHOR";
}
function isPhenomenonEngineData(data) {
    return data.type === "PHENOMENON";
}
function isDialecticalEngineData(data) {
    return data.type === "DIALECTICAL";
}
function isUnknownEngineData(data) {
    return data.type === "UNKNOWN";
}
// ============================================
// 3. Annotation 定义
// ============================================
exports.ZhiyinAnnotation = langgraph_1.Annotation.Root({
    raw_prompt: (langgraph_1.Annotation),
    messages: (langgraph_1.Annotation),
    engine_data: (langgraph_1.Annotation),
    commander: (langgraph_1.Annotation),
    generals: (langgraph_1.Annotation),
    current_node: (langgraph_1.Annotation),
    error_logs: (langgraph_1.Annotation),
});
