import exp from "constants"
import type { PlasmoCSConfig } from "plasmo"

import { checkTimelineTextGpt } from "./gpt"
import { Console } from "console"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

let timelinePostList: HTMLElement[] = []

// ポストのテキストを取得する関数
// TODO: 取得したテキストをリストに格納する
export const getTimelinePost = (node: HTMLElement) => {
  if (node.querySelector<HTMLElement>("[data-testid='tweetText']")) {
    timelinePostList.push(node)
  }
}

export const getTimelinePostList = (): HTMLElement[] => {
  return timelinePostList
}

export const resetTimelinePostList = () => {
  timelinePostList = []
}

// ポストのテキストをGPTに送信し、結果を受け取る関数
export const checkTimelinePost = async (timelineList: HTMLElement[]) => {
  const timelineListFilter = []
  const timelineListFormat = []
  timelineList.forEach((timeline, index) => {
    const postElement = timeline.querySelector<HTMLElement>("[data-testid='tweetText']")
    if(postElement) {
      if (!timelineListFormat.includes(postElement.outerHTML)) {
        timelineListFilter.push(timelineList[index])
        timelineListFormat.push(postElement.outerHTML)
      }
    }
  })
  resetTimelinePostList()
  const returnGptResult: number[] = await checkTimelineTextGpt([
    ...new Set(timelineListFormat)
  ])
  const returnGptResultFormat = returnGptResult.map((level, index) =>
  ({
    timelineList: timelineListFilter[index],
    level: level
  }))
  return returnGptResultFormat
}
