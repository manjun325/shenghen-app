"use client";
import { useState } from "react";

type TagType = "all" | "daily" | "book" | "movie" | "music" | "place";

const TAGS: { id: TagType; label: string; emoji: string }[] = [
  { id: "all", label: "全部", emoji: "" },
  { id: "daily", label: "日常", emoji: "☀️" },
  { id: "book", label: "书籍", emoji: "📚" },
  { id: "movie", label: "电影", emoji: "🎬" },
  { id: "music", label: "音乐", emoji: "🎵" },
  { id: "place", label: "地点", emoji: "📍" },
];

const mockData = [
  {
    id: 1, seed: "tl1", month: "2026.05", day: 14, weekday: "周三",
    title: "《奥本海默》，看完出来天已经黑了，在门口站了很久。",
    tag: "movie" as TagType, emoji: "🎬",
    detail: "克里斯托弗·诺兰 · IMAX",
    photo: "https://picsum.photos/seed/tl1p/80/80",
  },
  {
    id: 2, seed: "tl2", month: "2026.05", day: 12, weekday: "周一",
    title: "傍晚五点半，外滩边的风很大，停下来拍了很久。",
    tag: "place" as TagType, emoji: "📍",
    detail: "上海 · 外滩",
    photo: "https://picsum.photos/seed/tl2p/80/80",
  },
  {
    id: 3, seed: "tl3", month: "2026.05", day: 10, weekday: "六",
    title: "《百年孤独》读完了，最后一页合上时沉默了很久。",
    tag: "book" as TagType, emoji: "📚",
    detail: "加西亚·马尔克斯 · 译林出版社",
    photo: "https://picsum.photos/seed/tl3p/80/80",
  },
  {
    id: 4, seed: "tl4", month: "2026.05", day: 7, weekday: "周三",
    title: "Norah Jones《Come Away with Me》，单曲循环了一整个下午。",
    tag: "music" as TagType, emoji: "🎵",
    detail: "Norah Jones · Come Away with Me",
    photo: "https://picsum.photos/seed/tl4p/80/80",
  },
  {
    id: 5, seed: "tl5", month: "2026.05", day: 3, weekday: "周日",
    title: "五一假期最后一天，西湖边人很多，找到了一处安静的角落。",
    tag: "place" as TagType, emoji: "📍",
    detail: "杭州 · 西湖",
    photo: "https://picsum.photos/seed/tl5p/80/80",
  },
  {
    id: 6, seed: "tl6", month: "2026.04", day: 28, weekday: "周一",
    title: "今天是普通的一天，自己做了番茄蛋面，意外地好吃。",
    tag: "daily" as TagType, emoji: "☀️",
    detail: "上海 · 家",
    photo: "https://picsum.photos/seed/tl6p/80/80",
  },
  {
    id: 7, seed: "tl7", month: "2026.04", day: 21, weekday: "周一",
    title: "《请回答1988》二刷完，德善和正焕还是让我哭了。",
    tag: "movie" as TagType, emoji: "🎬",
    detail: "韩剧 · 20集",
    photo: "https://picsum.photos/seed/tl7p/80/80",
  },
];

export default function TimelinePage() {
  const [activeTag, setActiveTag] = useState<TagType>("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = activeTag === "all" ? mockData : mockData.filter(m => m.tag === activeTag);

  // 按月份分组
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.month]) acc[item.month] = [];
    acc[item.month].push(item);
    return acc;
  }, {} as Record<string, typeof mockData>);

  return (
    <div>
      {/* 顶部 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold">时间线</h1>
        <button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#1A1A1A">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>

      {/* 内容类型筛选 */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
        {TAGS.map(tag => (
          <button key={tag.id} onClick={() => setActiveTag(tag.id)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all"
            style={{
              background: activeTag === tag.id ? '#1A1A1A' : '#F6F6F6',
              color: activeTag === tag.id ? '#fff' : '#1A1A1A',
            }}>
            {tag.emoji && <span>{tag.emoji}</span>}
            <span>{tag.label}</span>
            {activeTag === tag.id && (
              <span className="ml-1">{filtered.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* 分隔线 */}
      <div style={{ height: 8, background: '#F6F6F6' }} />

      {/* 时间线内容 */}
      <div className="px-4 pt-3">
        {Object.entries(grouped).map(([month, items]) => (
          <div key={month} className="mb-4">
            {/* 月份标题 */}
            <h2 className="text-base font-bold mb-3">{month}</h2>

            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  {/* 日期 */}
                  <div className="flex flex-col items-center pt-1" style={{ minWidth: 36 }}>
                    <span className="text-xl font-bold leading-none" style={{ color: '#1A1A1A' }}>{item.day}</span>
                    <span className="text-xs" style={{ color: '#9B9B9B' }}>{item.weekday}</span>
                  </div>

                  {/* 卡片 */}
                  <div className="flex-1 rounded-2xl overflow-hidden"
                    style={{ background: '#F6F6F6' }}>
                    <div className="p-3 flex gap-3 items-start">
                      {/* 封面图 */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://picsum.photos/seed/${item.seed}/80/80`} alt="" className="w-full h-full object-cover" />
                      </div>

                      {/* 内容 */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug mb-1.5" style={{ color: '#1A1A1A' }}>
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: '#E8E8E8', color: '#666' }}>
                            {item.emoji} {TAGS.find(t => t.id === item.tag)?.label}
                          </span>
                          <span className="text-xs" style={{ color: '#9B9B9B' }}>🌐</span>
                        </div>
                      </div>

                      <button onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                        style={{ color: '#9B9B9B', flexShrink: 0 }}>⋮</button>
                    </div>

                    {/* 展开详情 */}
                    {expanded === item.id && (
                      <div className="px-3 pb-3 pt-0">
                        <div style={{ height: 1, background: '#E0E0E0', marginBottom: 12 }} />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://picsum.photos/seed/${item.seed}big/400/200`} alt=""
                          className="w-full rounded-xl object-cover mb-2" style={{ height: 120 }} />
                        <p className="text-xs" style={{ color: '#9B9B9B' }}>{item.detail}</p>
                        <div className="flex gap-2 mt-2">
                          {['✨ 感动', '🤔 思考', '💡 收获'].map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full"
                              style={{ background: '#E8E8E8', color: '#666' }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="h-6" />
    </div>
  );
}
