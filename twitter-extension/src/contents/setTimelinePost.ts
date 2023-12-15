import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

export const setTimelinePost = (checkResult: Array<{timelineList: Array<HTMLElement>, level: number}>) => {
  console.log(checkResult);
  for (let i = 0; i < checkResult.length; i++) {
    const spanElement = document.createElement("span");
    spanElement.textContent = `Level: ${checkResult[i].level}`; 
    checkResult[i].timelineList[i].appendChild(spanElement);
  }
}