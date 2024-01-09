import type { PlasmoCSConfig } from "plasmo"
import { postButton } from "./insert"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

export const publishSuggestion = async (suggestText: string) => {
  let textWrapper = fetchTextArea().querySelector('[data-text="true"]')?.parentElement
  fetchTextArea().focus()
  if (textWrapper) {
    if (textWrapper) {
      
      while (textWrapper.firstChild) {
        textWrapper.removeChild(textWrapper.firstChild)
      }
      
      textWrapper.innerHTML = `<span data-text="true">${suggestText}</span>`;
      textWrapper.dispatchEvent(new Event('input', { 'bubbles': true, 'cancelable': true }));
      console.log("textWrapper Content was changed!")
      postButton.click()
    }
  } else {
    console.log("textWrapper was not found!")
  }
}

export const fetchTextArea = () => {
  const inputSpace = document.querySelector(
    'div[data-testid^=\"tweetTextarea_\"][role=\"textbox\"]'
  )
  if (inputSpace) {
    return inputSpace
  }
  return null
}
