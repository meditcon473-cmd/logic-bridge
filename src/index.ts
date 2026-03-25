import { runZhiyin } from "./graph";

// 测试入口
const testPrompt = "请以'青年与时代'为题写一篇议论文";

runZhiyin(testPrompt).catch(console.error);