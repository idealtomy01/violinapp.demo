import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Settings & Help
          </p>
          <h1 className="text-3xl font-semibold text-white">補助ページ</h1>
          <p className="text-sm text-slate-300">
            プロフィール、通知設定、ヘルプ/問い合わせをまとめた中核ページです。
          </p>
        </header>

        <section className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">プロフィール</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm text-slate-300">
                <span>氏名（任意）</span>
                <input
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-white/40 focus:outline-none"
                  placeholder="例: 山田 太郎"
                />
              </label>
              <label className="space-y-1 text-sm text-slate-300">
                <span>メール（認証済）</span>
                <input
                  disabled
                  defaultValue="owner@example.com"
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-slate-300"
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end">
              <Button>保存</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">通知設定</h2>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              {[
                "投票締切リマインド",
                "重要アナウンス",
                "ドキュメント更新",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-black/30 px-3 py-3"
                >
                  <span>{item}</span>
                  <input type="checkbox" className="h-4 w-4 accent-white" />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">ヘルプ/問い合わせ</h2>
              <Button variant="secondary">問い合わせる</Button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {[
                "ログインできない場合の対処",
                "ウォレット紐付けの確認方法",
                "投票が反映されない場合",
              ].map((q) => (
                <div
                  key={q}
                  className="rounded-lg border border-white/5 bg-black/30 px-3 py-3"
                >
                  {q}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


