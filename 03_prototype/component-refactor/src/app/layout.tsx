import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
      <title>Relaha</title>
        {/* Googleフォント NOTO_SANS_JP をインポート */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Google Material Icons をインポート */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{children}</body>
    </html>
  )
}
