import type { PlasmoCSConfig } from "plasmo"
import { viewSuggestion } from "./suggest"

// TwitterのポストページのURLにマッチするPlasmoCSConfigを定義
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"]
}

let isSuggestions = true
export let postButton

/**
 * ポストボタンが存在する場合にsetPostButtonを呼び出す関数
 * @returns 存在する場合はtrue、しない場合はfalseを返す。
 */
export const checkPostButton = () => {
  // ポストボタンを取得
  postButton = document.querySelector<HTMLElement>(
    "[data-testid='tweetButton']"
  )
  // ポストボタンが存在する場合
  if (postButton) {
    setPostButtonStyle()
    return true
  }
  // 存在しない場合
  isSuggestions = true
  return false
}

/**
 * ポストボタンのスタイルを設定する関数
 * @param postButton - スタイルを設定するポストボタンの要素
 */
const setPostButtonStyle = () => {
  postButton.style.backgroundColor = "#333333"
  console.log("Post button style updated!")

  // ボタンがクリックされた時のイベントリスナー
  postButton.addEventListener("click", () => {
    console.log("Button pressed!")
    // ここにボタンが押された時の追加の処理を書くことができます
    if (isSuggestions) {
      isSuggestions = false
      viewSuggestion()
    }
  })
}
