import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const notices = [
  { title: "投票締切: 修復の可否", due: "残り 18 時間" },
  { title: "新規鑑定書が追加されました", due: "未閲覧" },
];

// 数値を「¥1,000,000」の形式にする便利関数
const formatCurrency = (amount: number | null) => {
  if (!amount) return "---";
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(amount);
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ログインしてない不審者はログイン画面へ強制送還
  if (!user) {
    redirect("/login");
  }

  // 資産データを取得
  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching assets:", error);
  }

  // 総評価額を計算
  const totalValue =
    assets?.reduce((sum, asset) => sum + (asset.current_value || 0), 0) || 0;

  // ステータスを集計（locationから判定）
  const storedCount =
    assets?.filter((asset) =>
      asset.location?.includes("保管")
    ).length || 0;
  const lentCount =
    assets?.filter((asset) => asset.location?.includes("貸与")).length || 0;

  return (
    <main className="min-h-screen bg-[#0b0b0f] px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold text-white">
            あなたの楽器ポートフォリオ
          </h1>
          <p className="text-sm text-slate-300">
            保有割合、評価額、現在地、重要通知をひと目で把握します。
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">総評価額（推定）</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {formatCurrency(totalValue)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">保有割合</p>
            <p className="mt-2 text-2xl font-semibold text-white">32.5%</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">ステータス</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              保管{storedCount} / 貸与{lentCount}
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {assets && assets.length > 0 ? (
            assets.map((asset) => (
              <div
                key={asset.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-white/5 p-5 shadow-xl shadow-black/30"
              >
                {/* 画像エリア */}
                {asset.image_url && (
                  <div className="mb-4 h-48 w-full overflow-hidden rounded-xl">
                    <Image
                      src={asset.image_url}
                      alt={asset.name || "Asset image"}
                      width={800}
                      height={400}
                      className="h-full w-full object-cover opacity-80"
                      unoptimized
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    My Asset
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {asset.name}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {asset.location || "---"}
                  </p>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-400">保有割合</p>
                    {/* TODO: ownershipsテーブルから実際の保有割合を計算 */}
                    <p className="text-xl font-semibold text-white">10.0%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">評価額</p>
                    <p className="text-xl font-semibold text-white">
                      {formatCurrency(asset.current_value)}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <Button variant="secondary" asChild className="w-full">
                    <Link href={`/assets/${asset.id}`}>詳細を見る</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/proposals">投票へ</Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-slate-400">資産データがありません</p>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                通知
              </p>
              <h3 className="text-lg font-semibold text-white">
                締切が近いタスク
              </h3>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/proposals">すべて見る</Link>
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.title}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-3"
              >
                <div>
                  <p className="text-sm text-white">{notice.title}</p>
                  <p className="text-xs text-slate-400">{notice.due}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                  優先
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
