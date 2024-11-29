"use client"
import React, { useState } from "react"
import BaseInput from "@/components/atoms/Inputs/BaseInput"
import Button from "@/components/atoms/buttons/Button"

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    alert(`Searching for: ${query}`)
  }

  return (
    <div className="flex items-center gap-1">
      <BaseInput
        placeholder="検索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="small"
      />
      <Button icon="search" variant="btn-primary" size="small" onClick={handleSearch} />
    </div>
  )
}

export default SearchBar
