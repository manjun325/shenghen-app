"use client";
import { useState } from "react";

const mockData = [
  { id: 1, seed: "tl1", date: "5月10日", location: "上海·静安区", title: "周六咖啡馆，窗边的光刚刚好，点了一杯燕麦拿铁。", likes: 128 },
  { id: 2, seed: "tl2", date: "5月7日", location: "上海·外滩", title: "傍晚五点半，外滩边的风很大，停下来拍了很久。", likes: 256 },
  { id: 3, seed: "tl3", date: "5月3日", location: "杭州·西湖", title: "五一假期最后一天，西湖边人很多，找到了一处安静的角落。", likes: 89 },
  { id: 4, seed: "tl4", date: "4月28日", location: "上海·家", title: "自己做了一碗番茄蛋面，意外地好吃，下次还要做。", likes: 312 },
  { id: 5, seed: "tl5", date: "4月21日", location: "上海·公司", title: "开了三个小时的会，但最后那个想法真的很有意思。", likes: 67 },
  { id: 6, seed: "tl6", date: "4月15日", location: "苏州·园区", title: "周末去了苏州，拙政园的荷花刚开。", likes: 445 },
];

export default function TimelinePage() {
  const [liked, setLiked] = useState<number[]>([]);
  const leftCol = mockData.filter((_, i) => i % 2 === 0);
  const rightCol = mockData.filter((_, i) => i % 2 === 1);

  const toggleLike = (id: number) => {
    setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const Card = ({ item, heightOffset }: { item: typeof mockData[0], heightOffset: number }) => (
    <div className="rounded-2xl overflow-hidden mb-2" style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://picsum.photos/seed/${item.seed}/300/${280 + heightOffset}`} alt={item.title} className="w-full object-cover" />
      <div className="p-2">
        <p className="text-xs font-medium leading-snug mb-1" style={{ color: '#1A1A1A' }}>{item.title}</p>
        <p className="text-xs mb-2" style={{ color: '#9B9B9B' }}>📍 {item.location} · {item.date}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.pravatar.cc/24?u=${item.seed}`} className="w-5 h-5 rounded-full" alt="" />
            <span className="text-xs" style={{ color: '#9B9B9B' }}>我的记忆</span>
          </div>
          <button onClick={() => toggleLike(item.id)} className="flex items-center gap-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill={liked.includes(item.id) ? "#FF2442" : "#9B9B9B"}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-xs" style={{ color: liked.includes(item.id) ? '#FF2442' : '#9B9B9B' }}>
              {item.likes + (liked.includes(item.id) ? 1 : 0)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* 顶部 */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <h1 className="text-lg font-bold">时光轴</h1>
        <div className="flex gap-2">
          {["全部", "今年", "去年"].map(f => (
            <button key={f} className="text-xs px-3 py-1 rounded-full"
              style={{ background: f === "全部" ? '#FF2442' : '#F6F6F6', color: f === "全部" ? '#fff' : '#9B9B9B' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 瀑布流 */}
      <div className="flex gap-2 px-3 mt-2">
        <div className="flex-1 flex flex-col">
          {leftCol.map((item, i) => <Card key={item.id} item={item} heightOffset={i * 30} />)}
        </div>
        <div className="flex-1 flex flex-col mt-6">
          {rightCol.map((item, i) => <Card key={item.id} item={item} heightOffset={i * 40 + 20} />)}
        </div>
      </div>
      <div className="h-6" />
    </div>
  );
}
