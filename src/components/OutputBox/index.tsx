import { Output } from "@/interface"
import React, { useEffect } from "react"

export default function OutputBox({ Loading, Output, Error }: Output): JSX.Element {
  return (
    <div className="flex flex-col p-3">
      <textarea rows={8} readOnly={true} placeholder="Output" className={`p-3 rounded-lg resize-none ${Error ? "text-red-500" : ""}`} value={Error ? Error : Output} />
      {/* {Loading && <span>Loading...</span>} */}
    </div>
  )
}
