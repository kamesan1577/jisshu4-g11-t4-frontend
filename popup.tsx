import React, { useState } from "react"

import OptionsIndex from "~options"

import "./style.css"

function ViewPopup() {
  return (
    <div className="p-4">
      <p>This extension is valid.</p>
    </div>
  )
}

function IndexPopup() {
  const [viewSettings, setViewSettings] = useState(false)

  const toggleViewSettings = () => {
    setViewSettings(!viewSettings)
  }

  return (
    <div className="w-64">
      <div className="bg-emerald-500 p-2 flex">
        <div className="flex-1">
          <h1 className="text-center text-white font-bold mt-0.5">
            {viewSettings ? "Settings" : "Misskey post interruptor"}
          </h1>
        </div>
        <div className="flex-none">
          <button
            onClick={toggleViewSettings}
            className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 focus:outline-none rounded-full w-6 h-6">
              {viewSettings ? <span className="i-ic-sharp-home text-white mt-1"></span> : <span className="i-ic-baseline-settings text-white mt-1"></span>}
          </button>
        </div>
      </div>
      {viewSettings ? <OptionsIndex /> : <ViewPopup />}
    </div>
  )
}

export default IndexPopup
