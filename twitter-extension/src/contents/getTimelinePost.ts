import { checkTimelineTextGpt } from "./gpt"
import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

let timelinePostList = []

// ポストのテキストを取得する関数
// TODO: 取得したテキストをリストに格納する
export const getTimelinePost = (node: HTMLElement) => {
  let timelineText = node.querySelector<HTMLElement>(
    "[data-testid='tweetText']"
  )
  if (timelineText) {
    timelinePostList.push(timelineText.outerHTML.toString())
  }
}

export const getTimelinePostList = (): HTMLElement[] => {
  return timelinePostList
}

// ポストのテキストをGPTに送信し、結果を受け取る関数
export const checkTimelinePost = async (checkList: HTMLElement[]) => {
  let result = await checkTimelineTextGpt(checkList)
  return result
}