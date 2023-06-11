import { IIdeNav } from "@/interface"
import React, { useState } from "react"
const fileTypes: Array<string> = ["c", "cpp", "py", "js", "java"]
export default function IdeNav({ Fontsize, Lang, Loading, HandleSubmit, handleFileChange, handleFileDownload }: IIdeNav): JSX.Element {
  const [file, setFile] = useState(null)

  return (
    <div className="py-1 item-center px-2 w-full flex justify-between bg-gray-100 dark:bg-gray-700 item-center">
      <div className=" w-3/4 sm:w-4/5 md:w-2/3 lg:w-1/2 flex md:justify-between sm:justify-start">
        <p className="h-full flex items-center">
          Language <span className="font-bold text-purple-500 dark:text-green-500">{": " + `${Lang}`}</span>
        </p>

        <div className="image-upload flex justify-center h-fit my-auto">
          <label htmlFor="file-input">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </label>

          <input
            type="file"
            id="file-input"
            className="flex justify-center h-fit my-auto"
            onChange={(e) => {
              e.preventDefault()
              handleFileChange(e.target.files)
            }}
            style={{ display: "none" }}
          />
          <p className="mx-3">Upload file</p>
        </div>
        <div className="flex justify-center h-fit my-auto">
          <button onClick={handleFileDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
          <p className="mx-3">Download code snippet</p>
        </div>
        {/* 
        <select
          name="fontSize"
          id="fontSize"
          className="m-1"
          onChange={(e) => {
            Fontsize(e.target.value)
          }}
        >
          <option value={14}>14</option>
          <option value={16}>16</option>
          <option value={18}>18</option>
          <option value={20}>20</option>
        </select> */}
      </div>

      <div className="flex items-center justify-center">
        {Loading && (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}

        <button className="py-1 px-4 m-2 bg-purple-500 rounded-md hover:bg-purple-800 dark:hover:bg-green-800 dark:bg-green-500" onClick={HandleSubmit}>
          Run
        </button>
      </div>
    </div>
  )
}
