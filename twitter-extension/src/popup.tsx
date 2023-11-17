import { useState } from "react"

import "./style.css"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: 300
      }}
      className="">
      <h1 className="text-center">Twitter Extension</h1>
    </div>
  )
}

export default IndexPopup
