"use client";
import { useState, useRef } from "react";

type ViewMode = "calendar" | "timeline" | "gallery" | "map";
type TagType = "all" | "daily" | "book" | "movie" | "music" | "place";

const TAGS: { id: TagType; label: string; emoji: string }[] = [
  { id: "all", label: "全部", emoji: "" },
  { id: "daily", label: "日常", emoji: "☀️" },
  { id: "book", label: "书籍", emoji: "📚" },
  { id: "movie", label: "电影", emoji: "🎬" },
  { id: "music", label: "音乐", emoji: "🎵" },
  { id: "place", label: "地点", emoji: "📍" },
];

const mockMemories = [
  { id: 1, seed: "m1", day: 10, title: "《百年孤独》读完了，最后一页合上时沉默了很久。", tag: "book" as TagType, emoji: "📚", likes: 128 },
  { id: 2, seed: "m2", day: 12, title: "傍晚五点半，外滩边的风很大，停下来拍了很久。", tag: "place" as TagType, emoji: "📍", likes: 256 },
  { id: 3, seed: "m3", day: 14, title: "《奥本海默》，看完出来天已经黑了。", tag: "movie" as TagType, emoji: "🎬", likes: 89 },
  { id: 4, seed: "m4", day: 7, title: "周六的咖啡馆，Norah Jones 单曲循环了一整个下午。", tag: "music" as TagType, emoji: "🎵", likes: 312 },
  { id: 5, seed: "m5", day: 3, title: "五一假期最后一天，西湖边人很多，找到了一处安静的角落。", tag: "place" as TagType, emoji: "📍", likes: 67 },
  { id: 6, seed: "m6", day: 1, title: "今天是普通的一天，但窗外的云很好看。", tag: "daily" as TagType, emoji: "☀️", likes: 445 },
];

const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
const recordedDays = new Set(mockMemories.map(m => m.day));

const VIEWS: { id: ViewMode; label: string }[] = [
  { id: "calendar", label: "日历" },
  { id: "timeline", label: "时间线" },
  { id: "gallery", label: "画廊" },
  { id: "map", label: "地点" },
];

export default function TodayPage() {
  const [view, setView] = useState<ViewMode>("calendar");
  const [activeTag, setActiveTag] = useState<TagType>("all");
  const [currentMonth] = useState({ year: 2026, month: 5 });
  const [uploadPhoto, setUploadPhoto] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = activeTag === "all" ? mockMemories : mockMemories.filter(m => m.tag === activeTag);

  return (
    <div>
      {/* 顶部标题 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold">记忆库</h1>
        <button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#1A1A1A">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>

      {/* 视图切换 Tab */}
      <div className="flex px-4 gap-0 mb-1 overflow-x-auto" style={{ borderBottom: '1px solid #EFEFEF' }}>
        {VIEWS.map(v => (
          <button key={v.id} onClick={() => setView(v.id)}
            className="pb-2 px-3 text-sm whitespace-nowrap transition-all"
            style={{
              color: view === v.id ? '#1A1A1A' : '#9B9B9B',
              fontWeight: view === v.id ? 700 : 400,
              borderBottom: view === v.id ? '2px solid #1A1A1A' : '2px solid transparent',
            }}>
            {v.label}
          </button>
        ))}
      </div>

      {/* 内容类型筛选标签 */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {TAGS.map(tag => (
          <button key={tag.id} onClick={() => setActiveTag(tag.id)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all"
            style={{
              background: activeTag === tag.id ? '#1A1A1A' : '#F6F6F6',
              color: activeTag === tag.id ? '#fff' : '#1A1A1A',
            }}>
            {tag.emoji && <span>{tag.emoji}</span>}
            <span>{tag.label}</span>
            {activeTag === tag.id && tag.id === "all" && <span className="ml-1">{mockMemories.length}</span>}
            {activeTag === tag.id && tag.id !== "all" && <span className="ml-1">{filtered.length}</span>}
          </button>
        ))}
      </div>

      {/* 日历视图 */}
      {view === "calendar" && (
        <div className="px-4">
          {/* 月份导航 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button className="text-lg">◀</button>
              <span className="text-base font-bold">{currentMonth.year}.{String(currentMonth.month).padStart(2, '0')}.</span>
              <button className="text-lg">▶</button>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ background: '#F6F6F6' }}>2:3</button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: '#F6F6F6' }}>⭐</button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: '#F6F6F6' }}>⬆</button>
            </div>
          </div>

          {/* 星期头 */}
          <div className="grid grid-cols-7 mb-1">
            {["周日","周一","周二","周三","周四","周五","周六"].map(d => (
              <div key={d} className="text-center text-xs py-1" style={{ color: '#9B9B9B' }}>{d}</div>
            ))}
          </div>

          {/* 日历格子 */}
          <div className="grid grid-cols-7 gap-y-1">
            {/* 5月1日是周四，前面补4个空格 */}
            {[0,1,2,3].map(i => <div key={`empty-${i}`} />)}
            {daysInMonth.map(day => {
              const mem = mockMemories.find(m => m.day === day);
              const hasRecord = recordedDays.has(day);
              return (
                <div key={day} className="flex flex-col items-center py-1">
                  {hasRecord && mem ? (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden cursor-pointer"
                      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://picsum.photos/seed/${mem.seed}/80/80`} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                        <span className="text-lg">{mem.emoji}</span>
                      </div>
                      {mockMemories.filter(m => m.day === day).length > 1 && (
                        <div className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white"
                          style={{ background: '#FF2442', fontSize: 10 }}>
                          {mockMemories.filter(m => m.day === day).length}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center">
                      <span className="text-sm" style={{ color: day === 15 ? '#FF2442' : '#1A1A1A', fontWeight: day === 15 ? 700 : 400 }}>
                        {day}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 时间线视图 */}
      {view === "timeline" && (
        <div className="px-4">
          <div className="mb-2 mt-1">
            <span className="text-base font-bold">2026.05</span>
          </div>
          <div className="space-y-3">
            {filtered.sort((a,b) => b.day - a.day).map(mem => (
              <div key={mem.id} className="flex gap-3">
                <div className="flex flex-col items-center pt-1" style={{ minWidth: 36 }}>
                  <span className="text-lg font-bold leading-none">{mem.day}</span>
                  <span className="text-xs" style={{ color: '#9B9B9B' }}>周{['日','一','二','三','四','五','六'][mem.day % 7]}</span>
                </div>
                <div className="flex-1 rounded-2xl p-3 flex items-center gap-3" style={{ background: '#F6F6F6' }}>
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                    style={{ background: '#E8E8E8' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://picsum.photos/seed/${mem.seed}/80/80`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug mb-1 line-clamp-2" style={{ color: '#1A1A1A' }}>{mem.title}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: '#EFEFEF', color: '#666' }}>
                        {mem.emoji} {TAGS.find(t => t.id === mem.tag)?.label}
                      </span>
                      <span style={{ color: '#9B9B9B', fontSize: 12 }}>🌐</span>
                    </div>
                  </div>
                  <button style={{ color: '#9B9B9B' }}>⋮</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 画廊视图 */}
      {view === "gallery" && (
        <div className="px-3">
          <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-2">
              {filtered.filter((_, i) => i % 2 === 0).map((mem, idx) => (
                <div key={mem.id} className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://picsum.photos/seed/${mem.seed}/300/${260 + idx * 40}`} alt="" className="w-full object-cover" />
                  <div className="p-2">
                    <p className="text-xs leading-snug mb-1" style={{ color: '#1A1A1A' }}>{mem.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F6F6F6', color: '#666' }}>
                      {mem.emoji} {TAGS.find(t => t.id === mem.tag)?.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-2 mt-6">
              {filtered.filter((_, i) => i % 2 === 1).map((mem, idx) => (
                <div key={mem.id} className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://picsum.photos/seed/${mem.seed}/300/${300 + idx * 30}`} alt="" className="w-full object-cover" />
                  <div className="p-2">
                    <p className="text-xs leading-snug mb-1" style={{ color: '#1A1A1A' }}>{mem.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F6F6F6', color: '#666' }}>
                      {mem.emoji} {TAGS.find(t => t.id === mem.tag)?.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 地点视图 */}
      {view === "map" && (
        <div className="px-4">
          {/* 地图占位 */}
          <div className="rounded-2xl overflow-hidden mb-4 relative" style={{ height: 200, background: '#E8F0E8' }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-4xl">🗺</span>
              <p className="text-sm" style={{ color: '#9B9B9B' }}>地点记忆地图</p>
            </div>
            {/* 地图标记 */}
            {[
              { top: '30%', left: '40%', label: '外滩' },
              { top: '55%', left: '60%', label: '静安' },
              { top: '20%', left: '70%', label: '西湖' },
            ].map(pin => (
              <div key={pin.label} className="absolute flex flex-col items-center" style={{ top: pin.top, left: pin.left }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md" style={{ background: '#FF2442' }}>
                  📍
                </div>
                <span className="text-xs mt-0.5 font-medium bg-white px-1 rounded shadow-sm">{pin.label}</span>
              </div>
            ))}
          </div>
          {/* 地点列表 */}
          <div className="space-y-3">
            {mockMemories.filter(m => m.tag === "place").map(mem => (
              <div key={mem.id} className="flex gap-3 items-center p-3 rounded-2xl" style={{ background: '#F6F6F6' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://picsum.photos/seed/${mem.seed}/80/80`} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{mem.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9B9B9B' }}>5月{mem.day}日</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 浮动添加按钮 */}
      <button
        onClick={() => { setShowUpload(true); fileRef.current?.click(); }}
        className="fixed bottom-24 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
        style={{ background: '#FF2442' }}>
        +
      </button>

      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) setUploadPhoto(URL.createObjectURL(file));
        }} />

      <div className="h-6" />
    </div>
  );
}
