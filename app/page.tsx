"use client";
import { useState } from "react";
import TodayPage from "@/components/TodayPage";
import TimelinePage from "@/components/TimelinePage";
import MonthlyReviewPage from "@/components/MonthlyReviewPage";
import BookshelfPage from "@/components/BookshelfPage";

const tabs = [
  { id: "today", label: "今日", icon: "✦" },
  { id: "timeline", label: "时光轴", icon: "◎" },
  { id: "monthly", label: "月度复盘", icon: "❋" },
  { id: "bookshelf", label: "传记", icon: "▣" },
];

export default function Home() {
  const [active, setActive] = useState("today");

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto pb-24">
        {active === "today" && <TodayPage />}
        {active === "timeline" && <TimelinePage />}
        {active === "monthly" && <MonthlyReviewPage />}
        {active === "bookshelf" && <BookshelfPage />}
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md"
        style={{ background: 'var(--card)', borderTop: '1px solid var(--border)' }}>
        <div className="flex justify-around items-center py-3 px-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
              style={{
                color: active === tab.id ? 'var(--accent)' : 'var(--muted)',
                background: active === tab.id ? '#FDF3E3' : 'transparent',
              }}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
