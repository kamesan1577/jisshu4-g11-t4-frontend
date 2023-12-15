import exp from "constants"
import { checkTimelineTextGpt } from "./gpt"
import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

let timelinePostList: HTMLElement[] = []

// ポストのテキストを取得する関数
// TODO: 取得したテキストをリストに格納する
export const getTimelinePost = (node: HTMLElement) => {
  let timelineText: HTMLElement = node.querySelector<HTMLElement>(
    "[data-testid='tweetText']"
  )
  if (timelineText && !timelineText.classList.contains('checkDone')) {
    timelinePostList.push(timelineText)
  }
}

export const getTimelinePostList = (): HTMLElement[] => {
  return timelinePostList
}

export const resetTimelinePostList = () => {
  timelinePostList = []
}

// ポストのテキストをGPTに送信し、結果を受け取る関数
export const checkTimelinePost = async (checkList: HTMLElement[]) => {
  resetTimelinePostList()
  let checkListFix = [...new Set(checkList)]
  let result = await checkTimelineTextGpt(checkListFix)
  return result
}