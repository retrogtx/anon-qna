"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button onClick={handleCopy} className="rounded-l-none">
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  )
}