import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

export const setTimelinePost = (checkResult: HTMLElement) => {
    console.log("setTimelinePost");
}