import React from "react"

import HomeSite from "@/components/templates/homeSite/HomeSite"
type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <main>
        {children}
        <HomeSite />
      </main>
    </div>
  )
}

export default MainLayout
