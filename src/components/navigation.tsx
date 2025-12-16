"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard", label: "ダッシュボード", icon: "📊" },
  { href: "/proposals", label: "投票", icon: "🗳️" },
  { href: "/activities", label: "活動履歴", icon: "📝" },
  { href: "/support", label: "設定", icon: "⚙️" },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ログインページとトップページではナビゲーションを表示しない
  if (pathname === "/login" || pathname === "/") {
    return null;
  }

  // 認証されていない場合は表示しない（認証ガードでリダイレクトされる）
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* デスクトップ用: 左サイドバー */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-white/10 bg-[#0b0b0f] p-6">
        <div className="mb-8">
          <Link href="/dashboard" className="text-xl font-semibold text-white">
            Stradivarius Hub
          </Link>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto">
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="w-full"
          >
            ログアウト
          </Button>
        </div>
      </aside>

      {/* モバイル用: ボトムタブ */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/10 bg-[#0b0b0f] px-2 py-2 md:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-lg px-4 py-2 text-xs transition-colors ${
                isActive ? "text-white" : "text-slate-400"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export function BackButton({ href, label = "戻る" }: { href: string; label?: string }) {
  return (
    <Link href={href}>
      <Button variant="secondary" className="mb-4">
        ← {label}
      </Button>
    </Link>
  );
}

