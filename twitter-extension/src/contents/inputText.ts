import type { PlasmoCSConfig } from "plasmo"

import { checkTextGpt } from "./gpt"
import { postButton } from "./insert"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

export const publishSuggestion = async (suggestText: string) => {
  console.log("publishSuggestion")
  let textWrapperMoto: HTMLInputElement = await fetchTextArea()
  let textWrapper = textWrapperMoto.querySelector('[data-text="true"]')
    ?.parentElement
  console.log(textWrapper)
  if (textWrapper) {
    /*
    while (textWrapper.firstChild && textWrapper.firstChild.textContent) {
      textWrapper.removeChild(textWrapper.firstChild)
    }
    */
    const newSpan = document.createElement('span');
    newSpan.setAttribute('data-text', 'true');
    newSpan.innerHTML = suggestText;
    textWrapper.appendChild(newSpan);
    textWrapperMoto.dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true })
    )

    console.log("textWrapper Content was changed!")
    //postButton.click()
  } else {
    console.log("textWrapper was not found!")
  }
}

/*const fetchTextArea = () => {
  let currentTextArea = document.querySelector(
    '[data-testid="tweetTextarea_0"]'
  )
  currentTextArea = currentTextArea.querySelector('[data-text="true"]')
    ?.parentNode as Element
  return currentTextArea
}*/

/*const fetchTextArea = (): HTMLInputElement | null => {
  const inputSpace = document.querySelector("div[data-testid^=\"tweetTextarea_\"][role=\"textbox\"]");
  if (inputSpace) {
    console.log("textArea was found!")
      return inputSpace as HTMLInputElement;
  }
};*/

const fetchTextArea = async (): Promise<HTMLInputElement | null> => {
  const inputSpace = document.querySelector(
    'div[data-testid^="tweetTextarea_"][role="textbox"]'
  )
  if (inputSpace) {
    return inputSpace as HTMLInputElement
  }
  return null
}
