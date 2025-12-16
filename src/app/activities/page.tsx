const activities = [
  {
    title: "メンテナンス完了",
    date: "2024-12-12",
    tag: "Maintenance",
    snippet: "定期メンテナンスと清掃を実施しました。",
    hash: "0x12ab...c9",
  },
  {
    title: "演奏会での使用",
    date: "2024-11-28",
    tag: "Performance",
    snippet: "〇〇ホールでのコンサートに貸与。",
    hash: "0x9f33...d1",
  },
  {
    title: "メディア掲載",
    date: "2024-11-10",
    tag: "Media",
    snippet: "クラシック専門誌に紹介されました。",
    hash: "0x5c2a...77",
  },
];

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Activity Log
          </p>
          <h1 className="text-3xl font-semibold text-white">活動履歴</h1>
          <p className="text-sm text-slate-300">
            タイムラインで最新の活動を確認し、ハッシュで真正性をチェックします。
          </p>
        </header>

        <section className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row"
            >
              <div className="h-24 w-full rounded-xl bg-black/30 md:w-44" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{activity.date}</span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px]">
                    {activity.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {activity.title}
                </h3>
                <p className="text-sm text-slate-300">{activity.snippet}</p>
                <div className="text-xs text-slate-400">
                  ハッシュ: <span className="font-mono">{activity.hash}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}


