import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

export const setTimelinePost = (checkResult: Array<{timelineList: HTMLElement, level: number}>) => {
  console.log(checkResult);
  for (let i = 0; i < checkResult.length; i++) {
    if (checkResult[i].level === 2) {
      checkResult[i].timelineList.style.backgroundColor = "#fff0f5";
      //checkResult[i].timelineList.remove()
    } else if (checkResult[i].level === 1) {
      checkResult[i].timelineList.style.backgroundColor = "#fffff0";
      /*const spanElement = document.createElement("span");
      spanElement.textContent = `Level: ${checkResult[i].level}`; 
      checkResult[i].timelineList.appendChild(spanElement);*/
    } else if (checkResult[i].level === 0) {
      checkResult[i].timelineList.style.backgroundColor = "#f0fff0";
      /*const spanElement = document.createElement("span");
      spanElement.textContent = `Level: ${checkResult[i].level}`; 
      checkResult[i].timelineList.appendChild(spanElement);*/
    }
  }
}