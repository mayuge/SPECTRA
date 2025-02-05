"use client"
import React from "react"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import ProjectCard from "@/components/molecules/frames/ProjectCard"
import PullTab from "@/components/atoms/buttons/PullTab"

const ProjectListApp: React.FC = () => {
  const { setModeDialogOpen, getModeDialogOpen } = useViewSiteMain()

  // ダイアログが閉じている場合は何も描画しない
  if (!getModeDialogOpen()) {
    return (
      <div className="relative z-10 w-min h-calc-100vh overflow-y-auto no-scrollbar flex items-center">
        <PullTab
          position="right"
          size="mini"
          variant="pullTab-light"
          icon="arrow_left"
          isShadow={true}
          onClick={() => {
            setModeDialogOpen(true)
          }}
        />
      </div>
    )
  }

  return (
    <div className="relative z-10 flex items-center max-w-md">
      <PullTab
        position="right"
        size="mini"
        variant="pullTab-light"
        icon="arrow_right"
        isShadow={true}
        onClick={() => {
          setModeDialogOpen(false)
        }}
      />
      <div className="h-calc-100vh min-w-[300px] bg-back shadow-lg shadow-black overflow-y-auto no-scrollbar">
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
        <ProjectCard
          logoImg=""
          text="まなびばならは"
          infoButtonClick={() => {}}
          dangerBadge="明治大学"
          warningBadge="野澤ゼミ"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="政治経済学部"
        />
      </div>
    </div>
  )
}

export default ProjectListApp
