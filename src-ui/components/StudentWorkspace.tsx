import React from 'react';

export default function StudentWorkspace() {
  return (
    // 全局底盘
    <div className="relative flex flex-col h-screen w-full bg-[#0D1117] text-[#E6EDF3] font-sans overflow-hidden p-6 gap-6">
      
      {/* 环境光 */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#3FB950] blur-[150px] opacity-[0.03] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#3FB950] blur-[150px] opacity-[0.03] rounded-full pointer-events-none -z-10"></div>

      {/* 顶栏 Header */}
      <header className="flex-none flex justify-between items-center h-14 px-2 border-b border-[#30363D] z-10">
        {/* 左侧: Logo + 切换器 */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-[#3FB950] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D1117" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h1 className="text-[#E6EDF3] font-bold tracking-widest text-sm uppercase">ZHIYIN</h1>
          
          {/* 文本/导图 切换器 */}
          <div className="flex items-center gap-1 ml-2 px-1 py-0.5 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20">
            <button className="px-3 py-1 rounded-md text-xs font-medium text-[#38BDF8] bg-[#38BDF8]/20">文本</button>
            <button className="px-3 py-1 rounded-md text-xs font-medium text-[#8B949E] hover:text-[#38BDF8] transition-colors">导图</button>
          </div>
        </div>

        {/* 居中发光胶囊 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-[#3FB950]/10 border border-[#3FB950]/30">
          <span className="text-[#3FB950] text-xs font-medium">🎯 写作模式锁定：思辨类</span>
        </div>

        {/* 右侧字数统计 */}
        <div className="text-[#8B949E] text-xs font-mono">1,247 字</div>
      </header>

      {/* 主网格 Bento Box Layout */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0 z-10">
        
        {/* 左侧栏: 苏格拉底启发画布 - col-span-3 */}
        <div className="col-span-3 flex flex-col bg-[#161B22] backdrop-blur-xl border border-[#30363D] rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-[#30363D]">
            <h2 className="text-[#8B949E] text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FBBF24] shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span>
              苏格拉底启发画布
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
            {/* AI 消息 - 琥珀金标识 */}
            <div className="relative pl-5">
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#FBBF24] shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
              <div className="absolute left-[3px] top-4 bottom-0 w-[1px] bg-[#30363D]"></div>
              <div className="text-xs text-[#FBBF24] font-bold mb-1.5">✦ AI 导师</div>
              <div className="text-sm text-[#E6EDF3] leading-relaxed">
                你好，我是你的作文导师。让我们从一个问题开始：当你看到"青年与时代"这个题目时，你最先想到的是什么？
              </div>
              
              <button className="mt-3 ml-1 px-3 py-1.5 rounded-lg border border-[#30363D] text-[#8B949E] text-xs hover:border-[#FBBF24] hover:text-[#FBBF24] transition-all">
                → 一键入文
              </button>
            </div>

            {/* 学生消息 - 渐变气泡 */}
            <div className="relative pl-5">
              <div className="absolute left-[3px] top-0 bottom-0 w-[1px] bg-[#30363D]"></div>
              <div className="ml-2 bg-gradient-to-br from-[#238636]/30 to-[#2EA043]/10 border border-[#3FB950]/20 rounded-2xl p-3.5">
                <div className="text-sm text-[#E6EDF3] font-medium leading-relaxed">
                  我想写青年人在时代发展中的责任和使命。
                </div>
              </div>
            </div>

            {/* AI 消息 2 */}
            <div className="relative pl-5">
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#FBBF24] shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
              <div className="absolute left-[3px] top-4 bottom-0 w-[1px] bg-[#30363D]"></div>
              <div className="text-xs text-[#FBBF24] font-bold mb-1.5">✦ AI 导师</div>
              <div className="text-sm text-[#E6EDF3] leading-relaxed">
                很好，这是一个方向。但"责任和使命"有些抽象。你能否用一个具体的场景或例子来具象化这个关系？
              </div>
            </div>
          </div>
          
          {/* 输入框 */}
          <div className="p-4 border-t border-[#30363D] bg-[#0D1117]">
            <div className="relative">
              <input type="text" placeholder="输入你的想法..." className="w-full bg-[#161B22] border border-[#30363D] rounded-lg py-3 px-4 text-sm text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none focus:border-[#FBBF24] transition-colors" />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 w-10 bg-[#FBBF24] hover:bg-[#F59E0B] transition-colors rounded-md flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D1117" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* 中央: 心流写作舱 - col-span-6 */}
        <div className="col-span-6 flex flex-col bg-[#161B22] backdrop-blur-xl border border-[#30363D] rounded-2xl overflow-hidden">
          {/* 核心材料折叠卡 */}
          <div className="p-3 border-b border-[#30363D] bg-[#0D1117]/50">
            <button className="flex items-center gap-2 text-[#8B949E] text-xs hover:text-[#E6EDF3] transition-colors">
              <span>🔽 核心材料折叠卡：青年与时代</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
            
            {/* 凤头 · 破题引入 (置灰) */}
            <div className="bg-[#161B22] rounded-xl p-4 border border-[#30363D] opacity-40">
              <h3 className="text-[#8B949E] text-xs font-bold mb-2 tracking-wider">凤头 · 破题引入</h3>
              <p className="text-[#8B949E] text-[15px] leading-relaxed">青年是时代的晴雨表，每一代青年都在书写属于自己的历史答卷。</p>
            </div>

            {/* 一帅 · 中心论点 (琥珀金边框+文字) */}
            <div className="bg-[#161B22] rounded-xl p-4 border border-[#FBBF24]/40 opacity-40">
              <h3 className="text-[#FBBF24] text-xs font-bold mb-2 tracking-wider flex items-center gap-2">
                一帅 · 中心论点
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FBBF24]/10 text-[#FBBF24]">统领</span>
              </h3>
              <p className="text-[#8B949E] text-[15px] leading-relaxed">青年与时代相互成就，青年是时代精神的传承者，时代是青年成长的舞台。</p>
            </div>

            {/* 将一 · 正向剖析 (置灰) */}
            <div className="bg-[#161B22] rounded-xl p-4 border border-[#30363D] opacity-40">
              <h3 className="text-[#8B949E] text-xs font-bold mb-2 tracking-wider">将一 · 正向剖析</h3>
              <p className="text-[#8B949E] text-[15px] leading-relaxed">回望历史，每一代青年都在时代变革中扮演着重要角色，从五四运动到改革开放，青年始终是时代的弄潮儿。</p>
            </div>

            {/* 将二 · 反向/让步论证 (ACTIVE 焦点 - 深黑底+绿发光边框) */}
            <div className="bg-[#1C2128] rounded-xl p-5 border border-[#3FB950]/50 shadow-[0_0_25px_rgba(63,185,80,0.15)]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[#E6EDF3] text-sm font-bold tracking-wider flex items-center gap-2">
                  将二 · 反向/让步论证
                </h3>
                <span className="bg-[#3FB950]/20 text-[#3FB950] text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-widest font-bold">ACTIVE</span>
              </div>
              <textarea 
                className="w-full bg-transparent outline-none text-[#E6EDF3] font-medium resize-none leading-relaxed text-[15px]" 
                rows={4} 
                defaultValue="然而，时代给予青年的不仅是机遇，更是责任与担当。在追求效率的同时，如何守护人性的温度，这需要我们在科技发展与人文关怀之间找到平衡。" 
              />
            </div>

            {/* 将三 · 时代关联 (置灰) */}
            <div className="bg-[#161B22] rounded-xl p-4 border border-[#30363D] opacity-40">
              <h3 className="text-[#8B949E] text-xs font-bold mb-2 tracking-wider">将三 · 时代关联</h3>
              <p className="text-[#8B949E] text-[15px] leading-relaxed">当今世界正经历百年未有之大变局，数字经济、人工智能等新时代浪潮，为青年提供了前所未有的广阔舞台。</p>
            </div>

            {/* 豹尾 · 辩证升华 (置灰) */}
            <div className="bg-[#161B22] rounded-xl p-4 border border-[#30363D] opacity-40">
              <h3 className="text-[#8B949E] text-xs font-bold mb-2 tracking-wider">豹尾 · 辩证升华</h3>
              <p className="text-[#8B949E] text-[15px] leading-relaxed">让我们以青春之我，创建青春之家庭，青春之国家，青春之民族，在时代洪流中书写无愧于时代的青春华章。</p>
            </div>

          </div>
        </div>

        {/* 右侧: 数据面板 - col-span-3 */}
        <div className="col-span-3 flex flex-col gap-4">
          
          {/* 卡片一: 思维框架 */}
          <div className="flex-1 bg-[#161B22] backdrop-blur-xl border border-[#30363D] rounded-2xl p-5">
            <h3 className="text-[#8B949E] text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
              🧭 当前思维框架 [思辨类]
            </h3>
            <div className="space-y-2.5">
              <div className="text-sm text-[#8B949E] pl-1">
                1. 核心矛盾界定
              </div>
              <div className="text-sm text-[#FBBF24] pl-1 font-medium">
                2. 确立思辨主轴 (一帅)
              </div>
              <div className="text-sm text-[#8B949E] pl-1">
                3. 正向剖析本质 (将一)
              </div>
              <div className="flex items-center gap-2 text-sm text-[#3FB950] font-medium pl-1">
                <span className="w-2 h-2 rounded-full bg-[#3FB950] shadow-[0_0_6px_rgba(63,185,80,0.5)]"></span>
                <span>4. 反向审视/破立结合 (将二)</span>
              </div>
              <div className="text-sm text-[#8B949E] pl-1">
                5. 关联时代语境 (将三)
              </div>
              <div className="text-sm text-[#8B949E] pl-1">
                6. 辩证统一收结 (豹尾)
              </div>
            </div>
          </div>

          {/* 卡片二: 推演进度 */}
          <div className="bg-[#161B22] backdrop-blur-xl border border-[#30363D] rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="text-[#8B949E] text-xs mb-1 uppercase tracking-wider">当前节点</div>
                <div className="text-[#E6EDF3] font-bold text-sm">jiang_2</div>
              </div>
              <div className="text-right">
                <div className="text-[#8B949E] text-xs mb-1 uppercase tracking-wider">推演进度</div>
                <div className="text-[#3FB950] font-bold text-lg">3/6</div>
              </div>
            </div>
            <div className="w-full h-1.5 bg-[#0D1117] rounded-full overflow-hidden">
              <div className="h-full bg-[#3FB950] w-1/2 rounded-full shadow-[0_0_10px_rgba(63,185,80,0.3)]"></div>
            </div>
          </div>

          {/* 卡片三: 体检反馈 */}
          <div className="bg-[#161B22] backdrop-blur-xl border border-[#30363D] rounded-2xl p-5">
            <h3 className="text-[#8B949E] text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
              🎯 动态体检反馈
            </h3>
            <div className="flex gap-4 mb-4">
              <div className="text-sm">
                <span className="text-[#8B949E]">深度:</span> <span className="text-[#3FB950] font-bold">A</span>
              </div>
              <div className="text-sm">
                <span className="text-[#8B949E]">逻辑:</span> <span className="text-[#E6EDF3] font-bold">B+</span>
              </div>
            </div>
            <button className="w-full py-2.5 rounded-lg bg-[#0D1117] border border-[#30363D] text-[#8B949E] text-xs hover:border-[#3FB950] hover:text-[#3FB950] transition-all">
              点击生成深度报告
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
