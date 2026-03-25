import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";

// ============================================
// 1. 引擎专属数据 - 可辨识联合类型 (Discriminated Union)
// ============================================

export type EssayEngineData =
  | { type: "METAPHOR"; physical_entities: string[]; dynamic_processes: string[]; social_mapping: Record<string, string>; }
  | { type: "PHENOMENON"; subject: string; behavior: string; six_dim_perspective: string; essence_insight: string; }
  | { type: "DIALECTICAL"; concept_A: string; concept_B: string; gravity_field: string; }
  | { type: "UNKNOWN"; clarification_needed: boolean; };

export interface Generals {
  jiang_1: string;
  jiang_2: string;
  jiang_3: string;
}

export interface ZhiyinState {
  raw_prompt: string;
  messages: BaseMessage[];
  engine_data: EssayEngineData;
  commander: string;
  generals: Generals;
  current_node: string;
  error_logs: string[];
}

// ============================================
// 2. 类型守卫 (Type Guards)
// ============================================

export function isMetaphorEngineData(data: EssayEngineData): data is Extract<EssayEngineData, { type: "METAPHOR" }> {
  return data.type === "METAPHOR";
}

export function isPhenomenonEngineData(data: EssayEngineData): data is Extract<EssayEngineData, { type: "PHENOMENON" }> {
  return data.type === "PHENOMENON";
}

export function isDialecticalEngineData(data: EssayEngineData): data is Extract<EssayEngineData, { type: "DIALECTICAL" }> {
  return data.type === "DIALECTICAL";
}

export function isUnknownEngineData(data: EssayEngineData): data is Extract<EssayEngineData, { type: "UNKNOWN" }> {
  return data.type === "UNKNOWN";
}

// ============================================
// 3. Annotation 定义
// ============================================

export const ZhiyinAnnotation = Annotation.Root({
  raw_prompt: Annotation<string>,
  messages: Annotation<BaseMessage[]>,
  engine_data: Annotation<EssayEngineData>,
  commander: Annotation<string>,
  generals: Annotation<Generals>,
  current_node: Annotation<string>,
  error_logs: Annotation<string[]>,
});