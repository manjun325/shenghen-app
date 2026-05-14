"use client";
import { useState } from "react";
import TodayPage from "@/components/TodayPage";
import TimelinePage from "@/components/TimelinePage";
import MonthlyReviewPage from "@/components/MonthlyReviewPage";
import BookshelfPage from "@/components/BookshelfPage";

export default function Home() {
  const [active, setActive] = useState("today");

  return (
    <div className="max-w-sm mx-auto min-h-screen flex flex-col relative" style={{ background: '#fff' }}>
      {/* 状态栏 */}
      <div className="status-bar">
        <span>14:00</span>
        <div className="flex items-center gap-1 text-xs">
          <span>▌▌▌▌</span>
          <span>WiFi</span>
          <span>🔋</span>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {active === "today" && <TodayPage />}
        {active === "timeline" && <TimelinePage />}
        {active === "monthly" && <MonthlyReviewPage />}
        {active === "bookshelf" && <BookshelfPage />}
      </div>

      {/* 底部导航 - 小红书风格 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white"
        style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex justify-around items-center py-2 px-2">
          {/* 首页 */}
          <button onClick={() => setActive("today")}
            className="flex flex-col items-center gap-0.5 px-4 py-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill={active === "today" ? "#FF2442" : "#9B9B9B"}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs" style={{ color: active === "today" ? '#FF2442' : '#9B9B9B' }}>首页</span>
          </button>

          {/* 时光轴 */}
          <button onClick={() => setActive("timeline")}
            className="flex flex-col items-center gap-0.5 px-4 py-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill={active === "timeline" ? "#FF2442" : "#9B9B9B"}>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
            <span className="text-xs" style={{ color: active === "timeline" ? '#FF2442' : '#9B9B9B' }}>时光轴</span>
          </button>

          {/* 发布按钮 */}
          <button onClick={() => setActive("monthly")}
            className="flex flex-col items-center -mt-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: '#FF2442' }}>
              <span className="text-white text-2xl font-light">+</span>
            </div>
          </button>

          {/* 月度复盘 */}
          <button onClick={() => setActive("monthly")}
            className="flex flex-col items-center gap-0.5 px-4 py-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill={active === "monthly" ? "#FF2442" : "#9B9B9B"}>
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span className="text-xs" style={{ color: active === "monthly" ? '#FF2442' : '#9B9B9B' }}>复盘</span>
          </button>

          {/* 传记 */}
          <button onClick={() => setActive("bookshelf")}
            className="flex flex-col items-center gap-0.5 px-4 py-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill={active === "bookshelf" ? "#FF2442" : "#9B9B9B"}>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span className="text-xs" style={{ color: active === "bookshelf" ? '#FF2442' : '#9B9B9B' }}>我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}
