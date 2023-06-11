import React, { useEffect, useState } from "react"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-jsx"
import "ace-builds/src-noconflict/snippets/c_cpp"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-min-noconflict/ext-searchbox"
import "ace-builds/src-noconflict/ext-language_tools"
import { useTheme } from "next-themes"
import { IIde } from "@/interface/index"

const languages = ["python", "javascript", "java"]
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`)
  require(`ace-builds/src-noconflict/snippets/${lang}`)
})
export default function Ide({ text, lang, fontSize, onChange, handleFileChange }: IIde): JSX.Element {
  const [mode, setMode] = useState<string>(lang === "c" || lang === "cpp" ? "c_cpp" : lang)

  useEffect(() => {
    if (lang === "c" || lang === "cpp") setMode("c_cpp")
    else {
      setMode(lang)
    }
  }, [lang])

  const { systemTheme, theme, setTheme } = useTheme()

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleFileChange(e.dataTransfer.files)
  }
  return (
    <div className="w-full p-4" onDrop={(e) => handleDrop(e)} onDragOver={(e) => handleDragOver(e)} onDragEnter={(e) => handleDragEnter(e)} onDragLeave={(e) => handleDragLeave(e)}>
      <AceEditor
        mode={mode}
        theme={theme === "dark" ? "solarized_dark" : "github"}
        fontSize={fontSize}
        onChange={onChange}
        height="29rem"
        width="100%"
        name="UNIQUE_ID_OF_DIV"
        value={text[lang]}
        editorProps={{ $blockScrolling: true }}
        setOptions={{ enableBasicAutocompletion: true, enableLiveAutocompletion: true }}
      />
    </div>
  )
}
