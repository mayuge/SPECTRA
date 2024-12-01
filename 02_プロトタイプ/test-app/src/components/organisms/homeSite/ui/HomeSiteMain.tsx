"use client"
import Link from "next/link"
import React from "react"
import SearchBar from "@/components/molecules/forms/SearchBar"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import useHomeSiteMain from "@/components/organisms/homeSite/core/application/useHomeSiteMain"

const HomeSiteMain: React.FC = () => {
  const { buttonClicked } = useHomeSiteMain()

  return (
    <div>
      <Button icon="refresh" variant="btn-primary" size="normal" onClick={buttonClicked} />
    </div>
  )
}

export default HomeSiteMain
