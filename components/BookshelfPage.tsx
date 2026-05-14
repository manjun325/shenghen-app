"use client";
import { useState } from "react";

const stats = [
  { label: "记录天数", value: "847" },
  { label: "照片", value: "1.2k" },
  { label: "获赞", value: "3.8k" },
];

const years = [
  { year: "2026", months: 5, seed: "book2026", summary: "新的起点，新的故事" },
  { year: "2025", months: 12, seed: "book2025", summary: "那年学会了放慢脚步" },
  { year: "2024", months: 12, seed: "book2024", summary: "毕业、工作、第一次独自旅行" },
];

export default function BookshelfPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      {/* 个人资料头部 */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.pravatar.cc/80?u=iris" className="w-20 h-20 rounded-full" alt="头像" />
          <div className="flex-1 pt-1">
            <h2 className="text-lg font-bold mb-1">我的传记</h2>
            <p className="text-sm" style={{ color: '#9B9B9B' }}>用照片记录每一天</p>
            <div className="flex gap-4 mt-2">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-base font-bold">{s.value}</div>
                  <div className="text-xs" style={{ color: '#9B9B9B' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="w-full mt-3 py-2 rounded-full text-sm font-medium"
          style={{ border: '1px solid var(--border)', color: '#1A1A1A' }}>
          编辑资料
        </button>
      </div>

      {/* 分割线 */}
      <div style={{ height: 8, background: '#F6F6F6' }} />

      {/* 传记书架 */}
      <div className="px-4 pt-3">
        <h3 className="text-base font-bold mb-3">我的年份</h3>
        {years.map(book => (
          <div key={book.year}>
            <div className="flex gap-3 mb-3 cursor-pointer"
              onClick={() => setOpen(open === book.year ? null : book.year)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://picsum.photos/seed/${book.seed}/120/120`}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0" alt={book.year} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold">{book.year}年</span>
                  <span className="text-xs" style={{ color: '#9B9B9B' }}>{book.months}个月 ›</span>
                </div>
                <p className="text-sm mt-1" style={{ color: '#9B9B9B' }}>{book.summary}</p>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: Math.min(book.months, 6) }, (_, i) => (
                    <div key={i} className="w-6 h-6 rounded overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://picsum.photos/seed/${book.seed}${i}/24/24`} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {book.months > 6 && (
                    <div className="w-6 h-6 rounded flex items-center justify-center text-xs"
                      style={{ background: '#F6F6F6', color: '#9B9B9B' }}>
                      +{book.months - 6}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {open === book.year && (
              <div className="mb-3 p-3 rounded-2xl" style={{ background: '#F6F6F6' }}>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: book.months }, (_, i) => (
                    <button key={i} className="py-2 rounded-xl text-xs text-center"
                      style={{ background: '#fff', color: '#1A1A1A' }}>
                      {i + 1}月
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="mx-4 mb-6 p-3 rounded-2xl text-center" style={{ background: '#FFF0F2' }}>
        <p className="text-sm font-medium" style={{ color: '#FF2442' }}>你已连续记录 847 天 🎉</p>
        <p className="text-xs mt-0.5" style={{ color: '#9B9B9B' }}>每一天都值得被记住</p>
      </div>
    </div>
  );
}
