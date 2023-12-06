import { checkPostButton } from "./insert"
import { getTimelinePost } from "./getTimelinePost"
import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

/**
 * DOMの変更を監視し、それに応じてアクションを実行するMutation Observer.
 * @param {MutationRecord[]} mutations - 発生した変更のリスト。
 */
const observer = new MutationObserver((mutations) => {
  // 変更のリストを反復処理する
  mutations.forEach((mutation) => {
    // 追加されたノードがある場合
    if (mutation.addedNodes.length) {
      // 追加されたノードを反復処理する
      mutation.addedNodes.forEach((node) => {
        // ノードがHTMLElementの場合
        if (node instanceof HTMLElement && node.querySelector<HTMLElement>(
          "[data-testid='tweetButton']"
        )) {
          checkPostButton(node)
        } else if (node instanceof HTMLElement && node.querySelector<HTMLElement>(
          "[data-testid='tweetText']"
        )) {
          getTimelinePost(node)
        }
      })
    }
  })
})

// DOMの変更を監視する
observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true
})
