import type { PlasmoCSConfig } from "plasmo"

import { postButton } from "./insert"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"]
}

export const publishSuggestion = (suggestText) => {
  const textWrapper =
    fetchTextArea()
  if (textWrapper) {
    while (textWrapper.firstChild) {
      textWrapper.removeChild(textWrapper.firstChild)
    }
    console.log("textWrapper Content was removed!")

    const newTextNode = document.createTextNode(suggestText)
    textWrapper.appendChild(newTextNode)
    textWrapper.dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true })
    )
    console.log("textWrapper Content was changed!")
    postButton.click()
  }
}

const fetchTextArea = () => {
  let currentTextArea = document.querySelector(
    '[data-testid="tweetTextarea_0"]'
  )
  currentTextArea = currentTextArea.querySelector('[data-text="true"]')
    ?.parentNode as Element
  return currentTextArea
}
