import React from "react"
import { Input } from "@/interface"

export default function InputBox({ handleInput }: Input): JSX.Element {
  return (
    <div className=" flex flex-col p-3">
      <textarea
        name="input"
        autoFocus={true}
        rows={8}
        placeholder="Input"
        className="p-2 resize-none rounded-lg"
        onChange={(e) => {
          return handleInput(e.target.value)
        }}
      />
    </div>
  )
}
