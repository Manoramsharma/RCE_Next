import React from "react"
import Button from "@/components/Button"
import { ILang, ISidebar } from "@/interface"

const language = ["c", "cpp", "python", "javascript", "java"]
export default function Sidebar({ click }: ISidebar): JSX.Element {
  return (
    <div className="w-20">
      {language.map((value, i) => (
        <Button src={`/static/images/${value}.png`} key={i} Click={click} language={value} />
      ))}
    </div>
  )
}
