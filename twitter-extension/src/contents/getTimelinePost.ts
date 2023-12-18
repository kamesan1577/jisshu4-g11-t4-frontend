import exp from "constants"
import type { PlasmoCSConfig } from "plasmo"

import { checkTimelineTextGpt } from "./gpt"

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
  // tweetTextの要素を取得 GPTより値返還後,timeLineに挿入するために保持
  const timelineListFormat = timelineList.map(
    (timeline) => timeline.querySelector<HTMLElement>("[data-testid='tweetText']").outerHTML
  )
  resetTimelinePostList()
  const returnGptResult: number[] = await checkTimelineTextGpt([
    ...new Set(timelineListFormat)
  ])
  const returnGptResultFormat = returnGptResult.map((level, index) =>
  ({
    timelineList: timelineList[index],
    level: level
  }))
  return returnGptResultFormat
}
