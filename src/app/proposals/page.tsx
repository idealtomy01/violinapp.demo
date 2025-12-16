import { Button } from "@/components/ui/button";

const proposals = [
  {
    title: "修復の可否",
    summary: "軽微な亀裂の補修を実施するかどうか",
    deadline: "残り 18 時間",
    status: "open",
    myWeight: "22.5票",
  },
  {
    title: "貸与先の延長",
    summary: "〇〇バイオリニストへの貸与を3ヶ月延長",
    deadline: "残り 2 日",
    status: "open",
    myWeight: "22.5票",
  },
  {
    title: "保険プランの見直し",
    summary: "年間保険料の更新と補償範囲の拡張",
    deadline: "締切済",
    status: "closed",
    myWeight: "投票済",
  },
];

export default function ProposalsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Governance
          </p>
          <h1 className="text-3xl font-semibold text-white">
            提案と投票を管理
          </h1>
          <p className="text-sm text-slate-300">
            賛成/反対をワンタップで投票。締切と結果を明瞭に表示します。
          </p>
        </header>

        <section className="space-y-4">
          {proposals.map((proposal) => (
            <div
              key={proposal.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {proposal.status === "open" ? "進行中" : "締切"}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {proposal.title}
                  </h3>
                  <p className="text-sm text-slate-300">{proposal.summary}</p>
                  <p className="text-xs text-slate-400">
                    {proposal.status === "open"
                      ? `締切: ${proposal.deadline}`
                      : "集計完了・チェーン書き込み待ち"}
                  </p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                  {proposal.myWeight}
                </span>
              </div>
              {proposal.status === "open" ? (
                <div className="mt-4 flex gap-3">
                  <Button className="w-full" variant="secondary">
                    賛成
                  </Button>
                  <Button className="w-full">反対</Button>
                </div>
              ) : (
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <span>最終結果: 賛成 68% / 反対 32%</span>
                  <span className="rounded-full bg-white/10 px-2 py-1">
                    チェーン書き込み待ち
                  </span>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}


