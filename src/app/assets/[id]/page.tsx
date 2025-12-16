import { Button } from "@/components/ui/button";

type Props = {
  params: { id: string };
};

const documents = [
  {
    title: "鑑定書",
    status: "検証済",
    tx: "0xabcdef...1234",
  },
  {
    title: "保険証券",
    status: "未検証",
    tx: null,
  },
];

export default function AssetDetailPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-[#0b0b0f] px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Ownership & Provenance
          </p>
          <h1 className="text-3xl font-semibold text-white">
            資産詳細 #{params.id}
          </h1>
          <p className="text-sm text-slate-300">
            スペック、保有割合、ドキュメント証跡、履歴を確認します。
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <div className="h-64 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10" />
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { label: "製作年", value: "1715" },
                { label: "製作者", value: "Antonio Stradivari" },
                { label: "サイズ", value: "4/4" },
                { label: "コンディション", value: "Excellent" },
                { label: "現在地", value: "東京（保管）" },
                { label: "貸与先", value: "ー" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/5 bg-black/30 px-4 py-3"
                >
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="text-sm font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                保有情報
              </p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm text-slate-200">
                  <span>あなたの保有割合</span>
                  <span className="font-semibold">22.5%</span>
                </div>
                <div className="flex justify-between text-sm text-slate-200">
                  <span>票の重み</span>
                  <span className="font-semibold">22.5</span>
                </div>
                <div className="flex justify-between text-sm text-slate-200">
                  <span>評価額（推定）</span>
                  <span className="font-semibold">¥180,000,000</span>
                </div>
              </div>
              <Button className="mt-4 w-full">投票ページへ</Button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    ドキュメント
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    鑑定書・保険・契約
                  </h3>
                </div>
                <Button variant="secondary" size="sm">
                  一覧
                </Button>
              </div>
              <div className="mt-4 space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.title}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-black/30 px-3 py-3"
                  >
                    <div>
                      <p className="text-sm text-white">{doc.title}</p>
                      <p className="text-xs text-slate-400">
                        {doc.tx ? "チェーン記録済" : "未記録"}
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                履歴
              </p>
              <h3 className="text-lg font-semibold text-white">
                保有推移・移転ログ
              </h3>
            </div>
            <Button variant="secondary" size="sm">
              すべて表示
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {[
              "2024-12-01 所有割合を更新",
              "2024-10-10 保管場所を東京に移動",
              "2024-08-21 貸与終了、保管に戻す",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/5 bg-black/30 px-3 py-3 text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}


