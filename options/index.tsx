import React, { useRef, useState } from "react"

import "../style.css"

function OptionsIndex() {
  const [isSaved, setIsSaved] = useState(false)
  let inputToken = useRef<HTMLInputElement>(null)
  let inputEndPoint = useRef<HTMLInputElement>(null)

  chrome.storage.local.get(["token", "endpoint"], (result) => {
    inputToken.current.value = result.token
    inputEndPoint.current.value = result.endpoint
  })

  const saveToken = () => {
    if (!inputToken.current) return
    if (!inputEndPoint.current) return
    let token = inputToken.current.value
    let endPoint = inputEndPoint.current.value
    console.log(token, endPoint)

    chrome.storage.local.set({ token: token, endpoint: endPoint }).then(() => {
      console.log("Saved!")
    })
    chrome.storage.local.get(["token", "endpoint"], (result) => {
      inputToken.current.value = result.token
      inputEndPoint.current.value = result.endpoint
    })
    setIsSaved(true)
  }

  return (
    <div>
      <div className="p-2">
        <div className="p-2">
          <label className="block">
            <span className="block font-medium text-slate-700">API KEY</span>
            <div id="display_token"></div>
            <input
              type="text"
              defaultValue={inputToken}
              ref={inputToken}
              className="mt-1 block w-full px-2 py-1 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
            <span className="block font-medium text-slate-700 pt-2">
              END POINT URL
            </span>
            <div id="display_endpoint"></div>
            <input
              type="text"
              defaultValue={inputEndPoint}
              ref={inputEndPoint}
              className="mt-1 block w-full px-2 py-1 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </label>
          <div className="flex justify-end pt-2">
            <button
              id="save_button"
              onClick={saveToken}
              className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 focus:outline-none focus:ring focus:ring-slate-200 text-white px-2 py-1 rounded-md">
              {isSaved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptionsIndex
