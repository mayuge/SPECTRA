"use client"

import React from "react"
import SearchBar from "@/components/molecules/forms/SearchBar"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import useMenuSiteMain from "@/components/organisms/menuSite/core/application/useMenuSiteMain"

const MenuSiteMain: React.FC = () => {
  const { buttonClicked } = useMenuSiteMain()

  return (
    <div>
      <TextLabel text="メニューサイト" size="mini" bold={true} />
      <TextLabel text="メニューサイト" size="small" bold={true} />
      <TextLabel text="メニューサイト" size="normal" bold={true} />
      <TextLabel text="メニューサイト" size="large" bold={true} />

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

export default MenuSiteMain
