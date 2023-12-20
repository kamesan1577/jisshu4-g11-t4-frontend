import type { PlasmoCSConfig } from "plasmo"
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

export const setTimelinePost = (
  checkResult: Array<{ timelineList: HTMLElement; level: number }>
) => {
  for (let i = 0; i < checkResult.length; i++) {
    if (checkResult[i].level === 2) {
      checkResult[i].timelineList.style.display = "none"
    } else if (checkResult[i].level === 1) {
      const overlayElement = document.createElement("div")
      overlayElement.style.cssText = 
        `position: absolute; top: 50%; left: 50%;
        width: 100%; height: 98%; transform: translate(-50%, -50%);
        background-color: #FFFFFF;`
      checkResult[i].timelineList.appendChild(overlayElement)
      const overlayElement2 = document.createElement("div")
      overlayElement2.classList.add("suggest", "suggest-position")
      overlayElement.appendChild(overlayElement2)
      const title = document.createElement("p")
      title.textContent = "過激な投稿の可能性があります。"
      overlayElement2.appendChild(title)
      const button = document.createElement("button")
      button.textContent = "表示する"
      overlayElement2.appendChild(button)
      button.addEventListener("click", function() {
        const parentElement = overlayElement.parentNode;
        parentElement.removeChild(overlayElement);
    });
    } else if (checkResult[i].level === 0) {
    } else {
      checkResult[i].timelineList.style.backgroundColor = "#d3d3d3"
    }
  }
}
