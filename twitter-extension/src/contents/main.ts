import type { PlasmoCSConfig } from "plasmo"
import { checkPostButton } from "./insert"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"]
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
        if (node instanceof HTMLElement) {
          checkPostButton()
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
