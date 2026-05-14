"use client";
import { useState, useRef } from "react";

const mockSuggestion = [
  "傍晚的光打在窗台上，今天就这样悄悄过去了。",
  "又是忙碌的一天，但有些小事值得记住。",
  "今天的天空很好看，你有没有抬头看一眼？",
  "咖啡还没凉，思绪已经跑远了。",
];

export default function TodayPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [generating, setGenerating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const now = new Date();
  const dateStr = now.toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "long" });

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
    setSaved(false);
    // 模拟 AI 生成描述
    setGenerating(true);
    setTimeout(() => {
      setText(mockSuggestion[Math.floor(Math.random() * mockSuggestion.length)]);
      setGenerating(false);
    }, 1200);
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="px-5 pt-8">
      {/* 顶部日期 */}
      <div className="mb-6">
        <p className="text-sm" style={{ color: 'var(--muted)' }}>今天</p>
        <h1 className="serif text-2xl font-bold" style={{ color: 'var(--text)' }}>{dateStr}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#FDF3E3', color: 'var(--accent)' }}>
            ☀ 晴
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F0EDE8', color: 'var(--muted)' }}>
            📍 上海
          </span>
        </div>
      </div>

      {/* 照片区 */}
      {!photo ? (
        <div
          className="card flex flex-col items-center justify-center py-16 mb-6 cursor-pointer transition-all hover:shadow-md"
          onClick={() => fileRef.current?.click()}
        >
          <div className="text-4xl mb-3">📷</div>
          <p className="serif text-base" style={{ color: 'var(--muted)' }}>今天还没有记录</p>
          <p className="text-sm mt-1" style={{ color: 'var(--border)' }}>点击拍一张吧</p>
        </div>
      ) : (
        <div className="card overflow-hidden mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="今日记录" className="w-full object-cover" style={{ maxHeight: 280 }} />
          <div className="p-4">
            {generating ? (
              <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                <span className="animate-spin">✦</span>
                <span className="text-sm">AI 正在生成描述...</span>
              </div>
            ) : (
              <textarea
                className="w-full text-sm resize-none outline-none bg-transparent leading-relaxed"
                style={{ color: 'var(--text)' }}
                rows={3}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="写一句话描述今天..."
              />
            )}
            {!generating && (
              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{ background: '#FDF3E3', color: 'var(--accent)' }}
                  onClick={() => {
                    setGenerating(true);
                    setTimeout(() => {
                      setText(mockSuggestion[Math.floor(Math.random() * mockSuggestion.length)]);
                      setGenerating(false);
                    }, 800);
                  }}
                >
                  重新生成
                </button>
                <button
                  className="flex-1 py-2 rounded-xl text-sm font-medium text-white transition-all"
                  style={{ background: saved ? '#A0A0A0' : 'var(--accent)' }}
                  onClick={handleSave}
                  disabled={saved}
                >
                  {saved ? "✓ 已保存" : "保存记忆"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {saved && (
        <div className="card p-4 mb-4 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>今日记忆已保存</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>已连续记录 7 天，继续加油</p>
          </div>
        </div>
      )}

      {/* 三个快捷按钮 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: "🖼", label: "从相册选", action: () => fileRef.current?.click() },
          { icon: "📷", label: "拍一张", action: () => fileRef.current?.click() },
          { icon: "✏️", label: "写一句", action: () => setText("") },
        ].map(btn => (
          <button
            key={btn.label}
            onClick={btn.action}
            className="card py-4 flex flex-col items-center gap-2 transition-all active:scale-95"
          >
            <span className="text-2xl">{btn.icon}</span>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>{btn.label}</span>
          </button>
        ))}
      </div>

      {/* 周年纪念提醒 */}
      <div className="card p-4 mb-4" style={{ borderLeft: '3px solid var(--accent)' }}>
        <p className="text-xs font-medium mb-1" style={{ color: 'var(--accent)' }}>✦ 周年提醒</p>
        <p className="text-sm" style={{ color: 'var(--text)' }}>2年前的今天，你在杭州西湖边</p>
        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>「那天的龙井茶很香，走了很久的路」</p>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
    </div>
  );
}
