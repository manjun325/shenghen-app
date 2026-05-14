"use client";
import { useState } from "react";

const emotionData = [
  { day: "4/1", val: 0.6 }, { day: "4/5", val: 0.3 }, { day: "4/8", val: 0.8 },
  { day: "4/12", val: 0.9 }, { day: "4/15", val: 0.2 }, { day: "4/18", val: 0.7 },
  { day: "4/22", val: 0.85 }, { day: "4/25", val: 0.5 }, { day: "4/28", val: 0.75 },
  { day: "4/30", val: 0.9 },
];

const people = [
  { name: "妈妈", count: 8, emoji: "👩" },
  { name: "小林", count: 6, emoji: "👨" },
  { name: "Ray", count: 4, emoji: "🧑" },
];

export default function MonthlyReviewPage() {
  const [shared, setShared] = useState(false);

  const maxVal = Math.max(...emotionData.map(d => d.val));

  return (
    <div className="px-5 pt-8 pb-8">
      {/* 封面卡片 */}
      <div className="card overflow-hidden mb-5" style={{
        background: 'linear-gradient(135deg, #3D2B1F 0%, #C17F3C 100%)',
        minHeight: 180,
      }}>
        <div className="p-6 flex flex-col justify-between h-full" style={{ minHeight: 180 }}>
          <div>
            <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>月度记忆复盘</p>
            <h1 className="serif text-2xl font-bold text-white">2026年4月</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.8)' }}>你的这个月</p>
          </div>
          <p className="text-sm italic mt-6" style={{ color: 'rgba(255,255,255,0.9)' }}>
            「四月穿梭在咖啡馆与工位之间，有几个傍晚特别值得记住。」
          </p>
        </div>
      </div>

      {/* 数据概览 */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: "足迹城市", value: "3", icon: "📍", sub: "上海 杭州 苏州" },
          { label: "记录照片", value: "87", icon: "📸", sub: "最多：周末" },
          { label: "记录天数", value: "22", icon: "📝", sub: "本月30天" },
          { label: "情绪关键词", value: "温暖", icon: "😊", sub: "咖啡 · 朋友 · 阳光" },
        ].map(item => (
          <div key={item.label} className="card p-4">
            <div className="text-xl mb-1">{item.icon}</div>
            <div className="serif text-2xl font-bold" style={{ color: 'var(--accent)' }}>{item.value}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--text)' }}>{item.label}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{item.sub}</div>
          </div>
        ))}
      </div>

      {/* 最难忘的一刻 */}
      <div className="card mb-5 overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--accent)' }}>✦ 本月最难忘的一刻</p>
        </div>
        <div className="w-full h-40 flex items-center justify-center" style={{ background: '#F0EDE8' }}>
          <span className="text-5xl">🌆</span>
        </div>
        <div className="p-4">
          <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>4月12日 · 上海外滩</p>
          <p className="text-sm leading-relaxed serif" style={{ color: 'var(--text)' }}>
            傍晚五点半，你站在外滩边，风大到有点站不稳。那天你停下来拍了很久，
            也许是因为光线刚刚好，也许只是不想那一刻结束。
          </p>
        </div>
      </div>

      {/* 本月出现最多的人 */}
      <div className="card p-4 mb-5">
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--accent)' }}>✦ 本月出现最多的人</p>
        <div className="space-y-3">
          {people.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ background: '#FDF3E3' }}>
                {p.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{p.name}</span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>出现 {p.count} 次</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                  <div className="h-1.5 rounded-full" style={{
                    width: `${(p.count / 10) * 100}%`,
                    background: i === 0 ? 'var(--accent)' : i === 1 ? '#C1A03C' : '#C1B03C'
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 情绪曲线 */}
      <div className="card p-4 mb-5">
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--accent)' }}>✦ 情绪曲线</p>
        <div className="flex items-end gap-1 h-24">
          {emotionData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm transition-all"
                style={{
                  height: `${(d.val / maxVal) * 80}px`,
                  background: d.val > 0.7 ? 'var(--accent)' : d.val > 0.4 ? '#E8C99A' : '#E8D4C9',
                  minHeight: 4,
                }}
              />
              <span className="text-xs" style={{ color: 'var(--muted)', fontSize: 9 }}>{d.day}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs" style={{ color: 'var(--muted)' }}>😢 低落</span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>😊 愉快</span>
        </div>
      </div>

      {/* 行动按钮 */}
      <div className="space-y-3">
        <button
          className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all active:scale-98"
          style={{ background: 'var(--accent)' }}
        >
          📄 生成月记 PDF
        </button>
        <button
          className="w-full py-3 rounded-xl text-sm font-medium transition-all active:scale-98"
          style={{ background: '#FDF3E3', color: 'var(--accent)' }}
          onClick={() => setShared(true)}
        >
          {shared ? "✓ 已分享给家人" : "💌 分享给家人"}
        </button>
        <button
          className="w-full py-3 rounded-xl text-sm font-medium transition-all"
          style={{ background: 'var(--card)', color: 'var(--muted)', border: '1px solid var(--border)' }}
        >
          📚 保存到传记
        </button>
      </div>
    </div>
  );
}
