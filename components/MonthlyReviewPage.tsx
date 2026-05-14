"use client";
import { useState } from "react";

const emotionData = [0.6, 0.3, 0.8, 0.9, 0.2, 0.7, 0.85, 0.5, 0.75, 0.9, 0.4, 0.8, 0.6, 0.7];

export default function MonthlyReviewPage() {
  const [liked, setLiked] = useState(false);
  const max = Math.max(...emotionData);

  return (
    <div>
      {/* 顶部 */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <h1 className="text-lg font-bold">月度复盘</h1>
        <span className="text-sm" style={{ color: '#FF2442' }}>2026年4月</span>
      </div>

      {/* 封面大图 */}
      <div className="relative mx-3 mt-3 rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/seed/monthly-cover/600/300" alt="封面" className="w-full object-cover" style={{ height: 200 }} />
        <div className="absolute inset-0 flex flex-col justify-end p-4"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}>
          <p className="text-white text-xl font-bold">2026年4月</p>
          <p className="text-white text-sm opacity-90">「四月穿梭在咖啡馆与工位之间，有几个傍晚特别值得记住。」</p>
        </div>
        {/* 点赞 */}
        <button onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.9)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "#FF2442" : "#9B9B9B"}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      {/* 数据四宫格 */}
      <div className="grid grid-cols-4 gap-2 mx-3 mt-3">
        {[
          { label: "足迹", value: "3城", icon: "📍" },
          { label: "照片", value: "87张", icon: "📸" },
          { label: "记录", value: "22天", icon: "📝" },
          { label: "情绪", value: "温暖", icon: "😊" },
        ].map(item => (
          <div key={item.label} className="rounded-2xl p-3 text-center" style={{ background: '#F6F6F6' }}>
            <div className="text-lg mb-1">{item.icon}</div>
            <div className="text-sm font-bold" style={{ color: '#1A1A1A' }}>{item.value}</div>
            <div className="text-xs" style={{ color: '#9B9B9B' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 最难忘的一刻 */}
      <div className="mx-3 mt-3 rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/seed/best-moment/600/250" alt="最难忘" className="w-full object-cover" style={{ height: 160 }} />
        <div className="p-3">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: '#FF2442' }}>本月最难忘</span>
            <span className="text-xs" style={{ color: '#9B9B9B' }}>4月12日 · 外滩</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#1A1A1A' }}>
            傍晚五点半，你站在外滩边，风大到有点站不稳。那天你停下来拍了很久，也许是因为光线刚刚好。
          </p>
        </div>
      </div>

      {/* 情绪曲线 */}
      <div className="mx-3 mt-3 rounded-2xl p-4" style={{ background: '#F6F6F6' }}>
        <p className="text-sm font-bold mb-3">情绪曲线</p>
        <div className="flex items-end gap-1" style={{ height: 60 }}>
          {emotionData.map((val, i) => (
            <div key={i} className="flex-1 rounded-t-sm"
              style={{
                height: `${(val / max) * 56}px`,
                background: val > 0.7 ? '#FF2442' : val > 0.4 ? '#FFB3BC' : '#E0E0E0',
                minHeight: 4,
              }} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs" style={{ color: '#9B9B9B' }}>4/1</span>
          <span className="text-xs" style={{ color: '#9B9B9B' }}>4/30</span>
        </div>
      </div>

      {/* 本月出现的人 */}
      <div className="mx-3 mt-3 rounded-2xl p-4" style={{ background: '#F6F6F6' }}>
        <p className="text-sm font-bold mb-3">本月相遇</p>
        <div className="flex gap-4">
          {[
            { name: "妈妈", count: 8, u: "mom" },
            { name: "小林", count: 6, u: "lin" },
            { name: "Ray", count: 4, u: "ray" },
          ].map(p => (
            <div key={p.name} className="flex flex-col items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.pravatar.cc/48?u=${p.u}`} className="w-12 h-12 rounded-full" alt={p.name} />
              <span className="text-xs font-medium">{p.name}</span>
              <span className="text-xs" style={{ color: '#9B9B9B' }}>{p.count}次</span>
            </div>
          ))}
        </div>
      </div>

      {/* 行动按钮 */}
      <div className="mx-3 mt-4 mb-4">
        <button className="w-full py-3 rounded-full text-sm font-medium text-white"
          style={{ background: '#FF2442' }}>
          生成月记 · 保存到传记
        </button>
      </div>
    </div>
  );
}
