import "./globals.css"
import { Noto_Sans_JP } from "next/font/google"

const notoSansJp = Noto_Sans_JP({
  weight: ["400", "700"], // 必要なウェイトを指定
  subsets: ["latin"], // 日本語の場合 "latin" でOK
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <title>SPECTRA PROJECT</title>
        {/* Google Material Icons は next/font では未対応なので link のまま */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={notoSansJp.className}>{children}</body>
    </html>
  )
}
