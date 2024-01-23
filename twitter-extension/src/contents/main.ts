import type { PlasmoCSConfig } from "plasmo"

import {
  checkTimelinePost,
  getTimelinePost,
  getTimelinePostList
} from "./getTimelinePost"
import { checkPostButton } from "./insert"
import { setTimelinePost } from "./setTimelinePost"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

let timeline = "checked"
let post = "checked"

chrome.storage.local.get(["timelineCheck", "postCheck", "apiKey"], (result) => {
  timeline =
    result["timelineCheck"] === undefined ? "checked" : result["timelineCheck"]
  post = result["postCheck"] === undefined ? "checked" : result["postCheck"]
  if (result["apiKey"] === undefined || result["apiKey"] === null || result["apiKey"] === "") {
    console.log("INIAD AI-MOPを利用します。")
    startMutationObserver()
  } else {
    console.log("個人のトークンを利用します。")
    startMutationObserver()
  }
})

/**
 * DOMの変更を監視し、それに応じてアクションを実行するMutation Observer.
 * @param {MutationRecord[]} mutations - 発生した変更のリスト。
 */
const observer = new MutationObserver(async (mutations) => {
  // 変更のリストを反復処理する
  mutations.forEach((mutation) => {
    // 追加されたノードがある場合
    if (mutation.addedNodes.length) {
      // 追加されたノードを反復処理する
      mutation.addedNodes.forEach((node) => {
        // ノードがHTMLElementの場合
        if (
          node instanceof HTMLElement &&
          (node.querySelector<HTMLElement>("[data-testid='tweetButton']") ||
            node.querySelector<HTMLElement>(
              "[data-testid='tweetButtonInline']"
            )) &&
          post === "checked"
        ) {
          checkPostButton(node)
        } else if (
          node instanceof HTMLElement &&
          (node.querySelector<HTMLElement>("[data-testid='tweetText']") ||
            node.querySelector<HTMLElement>(
              "[data-testid='tweetTextarea_0_label']"
            )) &&
          timeline === "checked"
        ) {
          getTimelinePost(node)
        }
      })
    }
  })
  if (getTimelinePostList().length !== 0) {
    //console.log(getTimelinePostList());
    let checkTimelineTextGptResult = await checkTimelinePost(
      getTimelinePostList()
    )
    setTimelinePost(checkTimelineTextGptResult)
  }
  //resetTimelinePostList();
})

// DOMの変更を監視する
function startMutationObserver() {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  })
}
