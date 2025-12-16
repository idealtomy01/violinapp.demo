import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // セッション情報を更新（クッキーの期限延長など）
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * 以下のパスを除外して、すべてのリクエストでミドルウェアを実行
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化)
     * - favicon.ico
     * - 画像ファイル (.svg, .png, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}