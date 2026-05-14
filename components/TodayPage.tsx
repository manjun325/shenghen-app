"use client";
import { useState, useRef } from "react";

const mockPhotos = [
  { id: 1, seed: "memory1", title: "傍晚的光打在窗台上，今天就这样悄悄过去了。", user: "我的记忆", likes: 128, location: "上海·静安区" },
  { id: 2, seed: "memory2", title: "周六的咖啡馆，窗边的光刚刚好", user: "我的记忆", likes: 256, location: "上海·外滩" },
  { id: 3, seed: "memory3", title: "五一假期最后一天，西湖边人很多", user: "我的记忆", likes: 89, location: "杭州·西湖" },
  { id: 4, seed: "memory4", title: "自己做了一碗番茄蛋面，意外地好吃", user: "我的记忆", likes: 312, location: "上海·家" },
  { id: 5, seed: "memory5", title: "开了三个小时的会，但那个想法很有意思", user: "我的记忆", likes: 67, location: "上海·公司" },
  { id: 6, seed: "memory6", title: "今天天空很蓝，拍了很多云", user: "我的记忆", likes: 445, location: "上海" },
];

const mockSuggestions = [
  "傍晚的光打在窗台上，今天就这样悄悄过去了。",
  "又是忙碌的一天，但有些小事值得记住。",
  "咖啡还没凉，思绪已经跑远了。",
];

export default function TodayPage() {
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // 左右两列，瀑布流
  const leftCol = mockPhotos.filter((_, i) => i % 2 === 0);
  const rightCol = mockPhotos.filter((_, i) => i % 2 === 1);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewPhoto(URL.createObjectURL(file));
    setSaved(false);
    setGenerating(true);
    setTimeout(() => {
      setText(mockSuggestions[Math.floor(Math.random() * mockSuggestions.length)]);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div>
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex gap-4">
          <span className="text-base font-bold" style={{ color: '#FF2442', borderBottom: '2px solid #FF2442', paddingBottom: 4 }}>关注</span>
          <span className="text-base font-bold" style={{ color: '#9B9B9B' }}>发现</span>
          <span className="text-base font-bold" style={{ color: '#9B9B9B' }}>上海</span>
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#1A1A1A">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>

      {/* 新增记忆入口 */}
      {!newPhoto ? (
        <div className="mx-4 mt-3 mb-2 rounded-2xl overflow-hidden cursor-pointer"
          style={{ background: '#FFF0F2', border: '1.5px dashed #FF2442' }}
          onClick={() => fileRef.current?.click()}>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: '#FF2442' }}>
              <span className="text-white text-xl">+</span>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#FF2442' }}>记录今天</p>
              <p className="text-xs" style={{ color: '#9B9B9B' }}>拍一张照片，留住这一刻</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-4 mt-3 mb-2 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={newPhoto} alt="新记忆" className="w-full object-cover" style={{ maxHeight: 200 }} />
          <div className="p-3">
            {generating ? (
              <div className="flex items-center gap-2 text-sm" style={{ color: '#9B9B9B' }}>
                <span className="animate-spin inline-block">⟳</span> AI 正在生成描述...
              </div>
            ) : (
              <>
                <textarea
                  className="w-full text-sm resize-none outline-none leading-relaxed"
                  rows={2} value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="写一句话..."
                />
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 py-1.5 rounded-full text-sm"
                    style={{ background: '#F6F6F6', color: '#9B9B9B' }}
                    onClick={() => { setGenerating(true); setTimeout(() => { setText(mockSuggestions[Math.floor(Math.random() * mockSuggestions.length)]); setGenerating(false); }, 800); }}>
                    换一句
                  </button>
                  <button className="flex-1 py-1.5 rounded-full text-sm text-white"
                    style={{ background: saved ? '#ccc' : '#FF2442' }}
                    onClick={() => setSaved(true)} disabled={saved}>
                    {saved ? "✓ 已保存" : "发布"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 瀑布流 */}
      <div className="flex gap-2 px-3 mt-1">
        {/* 左列 */}
        <div className="flex-1 flex flex-col gap-2">
          {leftCol.map((item, idx) => (
            <div key={item.id} className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${item.seed}/300/${340 + idx * 40}`}
                alt={item.title}
                className="w-full object-cover"
              />
              <div className="p-2">
                <p className="text-xs font-medium leading-snug mb-2" style={{ color: '#1A1A1A' }}>{item.title}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://i.pravatar.cc/24?u=${item.seed}`} className="w-5 h-5 rounded-full" alt="" />
                    <span className="text-xs" style={{ color: '#9B9B9B' }}>我的记忆</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#9B9B9B">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="text-xs" style={{ color: '#9B9B9B' }}>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 右列 */}
        <div className="flex-1 flex flex-col gap-2 mt-4">
          {rightCol.map((item, idx) => (
            <div key={item.id} className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${item.seed}/300/${300 + idx * 60}`}
                alt={item.title}
                className="w-full object-cover"
              />
              <div className="p-2">
                <p className="text-xs font-medium leading-snug mb-2" style={{ color: '#1A1A1A' }}>{item.title}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://i.pravatar.cc/24?u=${item.seed}r`} className="w-5 h-5 rounded-full" alt="" />
                    <span className="text-xs" style={{ color: '#9B9B9B' }}>我的记忆</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#9B9B9B">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="text-xs" style={{ color: '#9B9B9B' }}>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
      <div className="h-6" />
    </div>
  );
}
