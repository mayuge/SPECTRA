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
      <TextLabel text="ホームサイト" size="mini" bold={true} />
      <TextLabel text="ホームサイト" size="small" bold={true} />
      <TextLabel text="ホームサイト" size="normal" bold={true} />
      <TextLabel text="ホームサイト" size="large" bold={true} />
      <Link href="/menu">
        menuページへ移動
      </Link>
      <SearchBar />
      <Button text="登録する" variant="btn-primary" size="normal" onClick={buttonClicked} />
      <Button text="キャンセル" variant="btn-secondary" size="normal" onClick={buttonClicked} />
      <Button
        text="保存する"
        icon="save"
        variant="btn-primary"
        size="small"
        onClick={buttonClicked}
      />
      <Button
        icon="add"
        shape="circle"
        variant="btn-secondary"
        size="small"
        onClick={buttonClicked}
      />
      <Button
        icon="add"
        shape="circle"
        variant="btn-primary"
        size="normal"
        onClick={buttonClicked}
      />
      <Button
        icon="add"
        shape="square"
        variant="btn-primary"
        size="normal"
        onClick={buttonClicked}
      />
      <Button
        icon="close"
        shape="square"
        variant="btn-danger"
        size="mini"
        onClick={buttonClicked}
      />
    </div>
  )
}

export default HomeSiteMain
