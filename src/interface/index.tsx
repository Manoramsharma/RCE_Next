export interface IButton {
  src: string
  Click: (value: string) => void
  language: string
  key: React.Key
}

export interface ILang {
  c: string
  cpp: string
  java: string
  python: string
  javascript: string
}

export interface ILangLocalStorage {
  c: string
  cpp: string
  java: string
  py: string
  js: string
}

export interface IIde {
  lang: string
  text: any
  fontSize: number
  onChange: (value: string, lang: string) => void
  handleFileChange: (file: FileList) => void
}

export interface IIdeNav {
  Fontsize: (value: string) => void
  Lang: string
  Loading: boolean
  HandleSubmit: () => Promise<void>
  handleFileChange: (file: FileList | null) => void
  handleFileDownload: () => void
}
export interface InputD {
  format: string
  code: any
  input?: string
}
export interface Input {
  handleInput: (value: string) => void
}
export interface Output {
  Loading: boolean
  Output: string
  Error: string
}
export interface ISidebar {
  click: (value: string) => void
}
