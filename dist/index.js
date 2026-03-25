"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graph_1 = require("./graph");
// 测试入口
const testPrompt = "请以'青年与时代'为题写一篇议论文";
(0, graph_1.runZhiyin)(testPrompt).catch(console.error);
