import { postButton } from "./insert"
import { checkTextGpt } from "./gpt"
import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

export const publishSuggestion = (suggestText: string) => {
  const textWrapper = fetchTextArea()
  if (textWrapper) {
    while (textWrapper.firstChild && textWrapper.firstChild.textContent) {
      //textWrapper.removeChild(textWrapper.firstChild)
      textWrapper.firstChild.textContent = "aaa"
    }
    console.log("textWrapper Content was removed!")
    checkTextGpt()

    const newTextNode = document.createTextNode(suggestText)
    textWrapper.appendChild(newTextNode)
    textWrapper.dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true })
    )
    console.log("textWrapper Content was changed!")
    postButton.click()
  } else {
    console.log("textWrapper was not found!")
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
