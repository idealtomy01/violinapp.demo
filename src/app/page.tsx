import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Stradivarius Owners Hub
          </p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            富裕層向けの共同所有・ガバナンスを支える
            <br />
            プライベートダッシュボード
          </h1>
          <p className="max-w-3xl text-slate-300">
            まずはメール認証だけで入室し、保有資産の可視化・投票・ドキュメント検証を
            Web2中心で素早く提供。将来的なオンチェーンDAO運用へスムーズに拡張できます。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/login">ログインへ</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/dashboard">ダッシュボードを見る（デモ）</Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "ガバナンス",
              desc: "持分連動の加重投票。締切と結果をシンプルに表示。",
            },
            {
              title: "真正性と透明性",
              desc: "PDFのハッシュ照合とチェーンリンクで改ざん検知。",
            },
            {
              title: "高級感あるUI",
              desc: "余白と静かなモーションで落ち着いた体験を提供。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20"
            >
              <p className="text-sm text-slate-400">{item.title}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {item.desc}
              </h3>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
