import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, MapPin, CheckCircle, FileText, Info } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

const formatCurrency = (amount: number | null) => {
  if (!amount) return "---";
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(amount);
};

export default async function AssetDetailPage({ params }: Props) {
  // Next.js 16ではparamsがPromiseなのでawaitが必要
  const { id } = await params;
  
  const supabase = await createClient();

  // ログインチェック
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // URLのIDを使ってデータを取得
  const { data: asset, error } = await supabase
    .from("assets")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !asset) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-slate-100 pb-20 md:pb-0">
      {/* ヒーローエリア（画像背景） */}
      <div className="relative h-[50vh] w-full bg-[#0b0b0f] overflow-hidden">
        {asset.image_url ? (
          <Image
            src={asset.image_url}
            alt={asset.name || "Asset image"}
            fill
            className="object-cover opacity-50"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white/10 via-white/5 to-white/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/50 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 max-w-7xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> ダッシュボードに戻る
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {asset.type && (
              <Badge
                variant="outline"
                className="border-white/20 text-slate-300 px-3 py-1 bg-white/5"
              >
                {asset.type}
              </Badge>
            )}
            {asset.location && (
              <div className="flex items-center text-slate-300 text-sm">
                <MapPin className="w-4 h-4 mr-1" /> {asset.location}
              </div>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 text-white">
            {asset.name}
          </h1>
          {asset.maker && asset.production_year && (
            <p className="text-lg md:text-xl text-slate-300">
              {asset.maker} ({asset.production_year})
            </p>
          )}
        </div>
      </div>

      {/* 詳細スペックエリア */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* 左側：スペック情報 */}
        <div className="lg:col-span-2 space-y-8 md:space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
              <Info className="w-5 h-5 mr-2 text-slate-400" />
              基本情報 (Specs)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
              <div>
                <p className="text-xs text-slate-400 mb-1">作者 (Maker)</p>
                <p className="font-semibold text-lg text-white">
                  {asset.maker || "---"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">製作年 (Year)</p>
                <p className="font-semibold text-lg text-white">
                  {asset.production_year ? `${asset.production_year}年` : "---"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">コンディション</p>
                <p className="font-semibold text-lg text-white">
                  {asset.condition || "---"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">保管場所</p>
                <p className="font-semibold text-lg text-white">
                  {asset.location || "---"}
                </p>
              </div>
            </div>
          </section>

          {asset.description && (
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                <FileText className="w-5 h-5 mr-2 text-slate-400" />
                解説
              </h2>
              <p className="text-slate-300 leading-relaxed text-base md:text-lg whitespace-pre-wrap bg-white/5 rounded-xl border border-white/10 p-6">
                {asset.description}
              </p>
            </section>
          )}
        </div>

        {/* 右側：購入・保有パネル */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 sticky top-8">
            <h3 className="text-lg font-semibold mb-6 text-white">現在の評価</h3>
            <div className="mb-8">
              <p className="text-xs text-slate-400 mb-1">市場評価額（推定）</p>
              <p className="text-3xl md:text-4xl font-semibold text-white">
                {formatCurrency(asset.current_value)}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">総発行口数</span>
                <span className="text-white">
                  {asset.total_shares ? `${asset.total_shares} 口` : "---"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">あなたの保有</span>
                <span className="text-slate-200 font-semibold">
                  10.0% (100口)
                </span>
              </div>
            </div>

            <Button className="w-full mt-8" asChild>
              <Link href="/proposals">投票ページへ</Link>
            </Button>

            <div className="mt-4 flex justify-center">
              <span className="text-xs text-slate-400 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" /> Verified on Blockchain
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
