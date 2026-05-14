"use client";
import { useState } from "react";

const books = [
  {
    year: "2026", chapters: 5, color: "#C17F3C",
    cover: "🌅", summary: "新的起点，新的城市，新的故事。",
    months: ["一月", "二月", "三月", "四月", "五月"],
  },
  {
    year: "2025", chapters: 12, color: "#7B9E87",
    cover: "🌿", summary: "那年学会了放慢脚步，好好感受。",
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  },
  {
    year: "2024", chapters: 12, color: "#7B87C1",
    cover: "⭐", summary: "毕业、工作、第一次独自旅行。",
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  },
];

export default function BookshelfPage() {
  const [openBook, setOpenBook] = useState<string | null>(null);

  return (
    <div className="px-5 pt-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="serif text-2xl font-bold" style={{ color: 'var(--text)' }}>我的传记</h1>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: '#FDF3E3', color: 'var(--accent)' }}>
          共 3 册
        </span>
      </div>
      <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>每一年，一本书。</p>

      {/* 书架 */}
      <div className="space-y-4">
        {books.map(book => (
          <div key={book.year}>
            {/* 书脊卡片 */}
            <div
              className="card overflow-hidden cursor-pointer transition-all active:scale-99"
              onClick={() => setOpenBook(openBook === book.year ? null : book.year)}
            >
              <div className="flex">
                {/* 书脊色条 */}
                <div className="w-3 flex-shrink-0" style={{ background: book.color }} />
                <div className="flex-1 p-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: `${book.color}22` }}>
                    {book.cover}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="serif text-xl font-bold" style={{ color: 'var(--text)' }}>{book.year}</span>
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>{book.chapters}个章节</span>
                    </div>
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--muted)' }}>{book.summary}</p>
                  </div>
                  <span style={{ color: 'var(--muted)' }}>{openBook === book.year ? '▲' : '▶'}</span>
                </div>
              </div>
            </div>

            {/* 展开章节 */}
            {openBook === book.year && (
              <div className="mt-2 ml-4 card p-4">
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--muted)' }}>章节目录</p>
                <div className="grid grid-cols-3 gap-2">
                  {book.months.map(month => (
                    <button
                      key={month}
                      className="py-2 px-3 rounded-xl text-xs text-center transition-all"
                      style={{ background: '#FDF3E3', color: 'var(--accent)' }}
                    >
                      {month}
                    </button>
                  ))}
                </div>
                {book.year === "2026" && (
                  <button
                    className="w-full mt-3 py-2 rounded-xl text-xs font-medium"
                    style={{ background: 'var(--border)', color: 'var(--muted)' }}
                  >
                    🔒 年度复盘将在12月31日解锁
                  </button>
                )}
                {book.year !== "2026" && (
                  <button
                    className="w-full mt-3 py-2 rounded-xl text-xs font-medium"
                    style={{ background: `${book.color}22`, color: book.color }}
                  >
                    ✦ 查看年度复盘
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="mt-6 p-4 rounded-2xl text-center" style={{ background: '#FDF3E3' }}>
        <p className="text-sm font-medium serif" style={{ color: 'var(--accent)' }}>
          你已记录人生的第 847 天
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>每一天都值得被记住</p>
      </div>

      <div className="h-8" />
    </div>
  );
}
