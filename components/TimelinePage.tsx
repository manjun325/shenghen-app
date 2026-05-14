"use client";
import { useState } from "react";

const mockData = [
  {
    id: 1, date: "2026年5月10日", location: "上海·静安区", emoji: "☕",
    desc: "周六的咖啡馆，窗边的光刚刚好，点了一杯燕麦拿铁。",
    color: "#FDF3E3", img: null,
  },
  {
    id: 2, date: "2026年5月7日", location: "上海·外滩", emoji: "🌆",
    desc: "傍晚五点半，外滩边的风很大，你停下来拍了很久。",
    color: "#F0F5FD", img: null,
  },
  {
    id: 3, date: "2026年5月3日", location: "杭州·西湖", emoji: "🌿",
    desc: "五一假期最后一天，西湖边人很多，但找到了一处安静的角落。",
    color: "#F0FDF4", img: null,
  },
  {
    id: 4, date: "2026年4月28日", location: "上海·家", emoji: "🍜",
    desc: "自己做了一碗番茄蛋面，意外地好吃，下次还要做。",
    color: "#FFF5F5", img: null,
  },
  {
    id: 5, date: "2026年4月21日", location: "上海·公司", emoji: "💡",
    desc: "开了三个小时的会，但最后那个想法真的很有意思。",
    color: "#F5F0FF", img: null,
  },
];

const views = ["日", "月", "年"];

export default function TimelinePage() {
  const [view, setView] = useState("日");
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="px-5 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="serif text-2xl font-bold" style={{ color: 'var(--text)' }}>时光轴</h1>
        <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {views.map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-3 py-1 text-sm transition-all"
              style={{
                background: view === v ? 'var(--accent)' : 'var(--card)',
                color: view === v ? 'white' : 'var(--muted)',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* 热力图 */}
      <div className="card p-4 mb-6">
        <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>本月记录热力图</p>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {Array.from({ length: 31 }, (_, i) => {
            const filled = [3, 7, 10, 14, 17, 21, 24, 28].includes(i + 1);
            const today = i + 1 === 13;
            return (
              <div
                key={i}
                className="aspect-square rounded-sm flex items-center justify-center text-xs"
                style={{
                  background: today ? 'var(--accent)' : filled ? '#F0D9BC' : 'var(--border)',
                  color: today ? 'white' : filled ? 'var(--accent)' : 'transparent',
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* 时间轴列表 */}
      <div className="relative">
        {/* 竖线 */}
        <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: 'var(--border)' }} />

        <div className="space-y-4">
          {mockData.map((item, idx) => (
            <div key={item.id} className="flex gap-4">
              {/* 节点圆圈 */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm"
                style={{ background: item.color, border: '2px solid var(--border)' }}>
                {item.emoji}
              </div>

              {/* 卡片 */}
              <div
                className="card flex-1 p-4 cursor-pointer transition-all active:scale-99"
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{item.date}</p>
                    <p className="text-xs mb-2" style={{ color: 'var(--accent)' }}>📍 {item.location}</p>
                  </div>
                  <span style={{ color: 'var(--muted)', fontSize: 12 }}>{expanded === item.id ? '▲' : '▼'}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{item.desc}</p>

                {expanded === item.id && (
                  <div className="mt-3 pt-3 flex gap-2" style={{ borderTop: '1px solid var(--border)' }}>
                    {['😊 快乐', '☕ 日常', '💭 思考'].map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full"
                        style={{ background: '#FDF3E3', color: 'var(--accent)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
