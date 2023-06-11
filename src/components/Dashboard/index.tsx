import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { boilerplate } from "@/utils/boilerplate"
import axios from "axios"
import Sidebar from "../Sidebar"
import IdeNav from "@/components/IdeNav"
import { ILang, ILangLocalStorage } from "@/interface/index"
import { API_PATH } from "../../../common/Constants"
import InputBox from "../InputBox"
import OutputBox from "../OutputBox"
import { Input, InputD } from "../../interface/index"
const Ide = dynamic(() => import("../../components/Ide"), { ssr: false })

const validFormat = { c: "c", cpp: "cpp", js: "javascript", py: "python", java: "java" }
export default function Dashboard() {
  const [lang, setLang] = useState("c")
  const [fontSize, setFontSize] = useState<number>(14)
  const [loading, setLoading] = useState<boolean>(false)
  const [text, setText] = useState({ javascript: "", c: "", cpp: "", java: "", python: "" })
  const [error, setError] = useState<string>("")
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const format = { javascript: "js", c: "c", cpp: "cpp", java: "java", python: "py" }
  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    setOutput("")
    setError("")
    const url = `${API_PATH}`
    var inputData: InputD = {
      format: format[lang as keyof ILang],
      code: (text as any)[lang],
    }
    if (input) {
      inputData = {
        format: format[lang as keyof ILang],
        code: (text as any)[lang],
        input: input,
      }
    }
    try {
      const { data } = await axios.post(API_PATH, inputData)
      if (data.status) setOutput(data.result)
      else setError(data.message)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const handleInput = (value: string): void => {
    setInput(value)
  }
  const onChange = (value: string): void => {
    setText((texts) => ({
      ...texts,
      [lang]: value,
    }))
  }
  const onClick = (value: string): void => {
    setLang(value)
  }
  const fontSizeHandle = (value: string): void => {
    setFontSize(parseInt(value))
  }
  const handleFileChange = async (file: FileList | null): Promise<void> => {
    if (file?.length) {
      let fileFormat = file[0].name.split(".").pop() || ""
      if (Object.keys(validFormat).includes(fileFormat)) {
        fileFormat = validFormat[fileFormat as keyof ILangLocalStorage]
        var reader = new FileReader()
        reader.readAsText(file[0], "UTF-8")
        reader.onload = (e) => {
          window.localStorage.setItem(`${fileFormat}-localStorage`, JSON.stringify(e?.target?.result))
          setText((texts) => ({
            ...texts,
            [fileFormat]: e?.target?.result,
          }))
          setLang(fileFormat)
        }
      }
    }
  }
  const handleFileDownload = (): void => {
    var data = new Blob()
    var file = window.URL.createObjectURL(data)
    let fileLink
    fileLink = document.createElement("a")
    fileLink.href = file
    fileLink.setAttribute("download", `${Date.now()}.${format[lang as keyof ILang]}`)
    fileLink.click()
  }
  useEffect(() => {
    const data = window.localStorage.getItem(`${lang}-localStorage`)
    if (data !== null) setText(JSON.parse(data))
    else setText((texts) => ({ ...texts, [lang]: boilerplate(lang) }))
  }, [lang])

  useEffect(() => {
    const dataDebounce = setTimeout(() => {
      window.localStorage.setItem(`${lang}-localStorage`, JSON.stringify(text))
    }, 1000)
    return () => {
      clearTimeout(dataDebounce)
    }
  }, [lang, text])
  return (
    <div className="h-full flex ">
      <Sidebar click={onClick} />

      <div className="w-full flex-col h-full bg-gray-200 dark:bg-gray-800">
        <IdeNav Fontsize={fontSizeHandle} Lang={lang} Loading={loading} HandleSubmit={handleSubmit} handleFileChange={handleFileChange} handleFileDownload={handleFileDownload} />
        <div className="w-full flex h-5/6 ">
          <div className="sm:w-2/3 md:w-4/6 lg:w-2/3">
            <Ide lang={lang} text={text} onChange={onChange} fontSize={fontSize} handleFileChange={handleFileChange} />
          </div>
          <div className="sm:w-1/3 md:w-2/6 lg:w-1/3 h-full">
            <div className="h-1/2 p-1">
              <InputBox handleInput={handleInput} />
            </div>
            <div className="h-1/2 p-1">
              <OutputBox Loading={loading} Output={output} Error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
