import { ChakraProvider } from "@chakra-ui/react"

import "./style.css"

function IndexPopup() {
  return (
    <ChakraProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          /*padding: 16,*/
          width: 250
        }}
        className="">
        <div className="text-center bg-gray-100 py-3">
          <h1 className="px-1">へいたんは動作しています。</h1>
        </div>
      </div>
    </ChakraProvider>
  )
}

export default IndexPopup
